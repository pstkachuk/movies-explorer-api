const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const secretKey = require('../utils/config');
const { messageNeedLogin } = require('../utils/const');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { auth } = req.cookies;
  if (!auth) {
    throw new UnauthorizedError(messageNeedLogin);
  }
  let payload;
  try {
    payload = jwt.verify(auth, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    throw new UnauthorizedError(messageNeedLogin);
  }

  req.user = payload;
  return next();
};
