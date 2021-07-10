const router = require('express').Router();
const { getCurrentUser, patchUserInfo } = require('../controllers/users');
// const { patchUserInfoValidator } = require('../utils/validators');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserInfo);

module.exports = router;
