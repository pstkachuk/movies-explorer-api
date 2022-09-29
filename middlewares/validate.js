const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { messageWrongURL } = require('../utils/const');

const validateUrl = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message(messageWrongURL);
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateSetUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl).required(),
    trailerLink: Joi.string().custom(validateUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(validateUrl).required(),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateSetUserInfo,
  validateCreateMovie,
  validateDeleteMovie,
};
