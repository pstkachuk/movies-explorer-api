const mongoose = require('mongoose');
const { isURL } = require('validator');
const { messageValidationError } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  director: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, messageValidationError],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isURL, messageValidationError],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isURL, messageValidationError],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
