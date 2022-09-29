const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validate');

const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getSavedMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
