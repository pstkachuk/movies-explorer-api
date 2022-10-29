const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  messageValidationError,
  messageFilmNotFound,
  messageFilmDeleteError,
  messageFilmIsDeleted,
} = require('../utils/const');

const Movie = require('../models/movie');

// вернуть сохраненные фильмы
const getSavedMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

// создать фильм
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(messageValidationError));
      } else {
        next(err);
      }
    });
};

// удалить фильм
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messageFilmNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(messageFilmDeleteError));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedmovie) => {
          res.send({ message: messageFilmIsDeleted, deletedmovie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(messageValidationError));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
