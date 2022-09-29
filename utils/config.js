const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const dataBase = 'mongodb://localhost:27017/moviesdb';
const secretKey = 'super-mega-giga-very-very-strong-secret';

module.exports = {
  limiter,
  dataBase,
  secretKey,
};
