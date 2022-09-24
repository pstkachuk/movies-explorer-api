const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');
const { messageUrlNotFound } = require('../utils/const');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.post('/signout', logout);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError(messageUrlNotFound));
});

module.exports = router;
