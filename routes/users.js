const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  setUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), setUserInfo);

module.exports = router;
