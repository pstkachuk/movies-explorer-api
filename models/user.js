const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messageValidationError, messageWrongLoginData } = require('../utils/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, messageValidationError],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(messageWrongLoginData));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(messageWrongLoginData));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
