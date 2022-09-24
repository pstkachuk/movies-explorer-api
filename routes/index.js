const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.post('/signout', logout);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

module.exports = router;
