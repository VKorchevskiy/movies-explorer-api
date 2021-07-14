const router = require('express').Router();
const { getCurrentUser, patchUserInfo } = require('../controllers/users');
const { patchUserValidator } = require('../utils/validators');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserValidator, patchUserInfo);

module.exports = router;
