const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createUserValidator, loginUserValidator } = require('../utils/validators');
const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND_ERROR } = require('../utils/constants');

router.post('/signin', loginUserValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => next(new NotFoundError(NOT_FOUND_ERROR)));

module.exports = router;
