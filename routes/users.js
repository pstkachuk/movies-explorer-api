const router = require('express').Router();
const { validateSetUserInfo } = require('../middlewares/validate');

const {
  getUser,
  setUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', validateSetUserInfo, setUserInfo);

module.exports = router;
