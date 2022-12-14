const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { secretKey } = require('../utils/config');
const {
  messageValidationError,
  messageEmailAlreadyExist,
  messageUserNotFound,
  messageUserLogout,
} = require('../utils/const');

const { NODE_ENV, JWT_SECRET } = process.env;

// создать пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create(
        {
          name,
          email,
          password: hash,
        },
      )
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
          _id: user._id,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(messageValidationError));
          } else if (err.code === 11000) {
            next(new ConflictError(messageEmailAlreadyExist));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// получить данные пользователя
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// обновить информацию о пользователе
const setUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(messageUserNotFound);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(messageValidationError));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(messageValidationError));
      } else if (err.code === 11000) {
        next(new ConflictError(messageEmailAlreadyExist));
      } else {
        next(err);
      }
    });
};

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' });
      res.cookie('auth', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        // secure: NODE_ENV === 'production',
      })
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch(next);
};

// логаут
const logout = (req, res) => {
  res.clearCookie('auth')
    .send({ message: messageUserLogout });
};

module.exports = {
  getUser,
  setUserInfo,
  createUser,
  login,
  logout,
};
