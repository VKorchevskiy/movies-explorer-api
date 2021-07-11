const router = require('express').Router();
const { errors, isCelebrateError } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createUserValidator, loginUserValidator } = require('../utils/validators');
const NotFoundError = require('../errors/not-found-error');
const InvalidDataError = require('../errors/invalid-data-error');
const NOT_FOUND_ERROR = require('../utils/constants');
const INVALID_DATA_ERROR = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginUserValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => next(new NotFoundError(NOT_FOUND_ERROR)));

router.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    next(new InvalidDataError(INVALID_DATA_ERROR));
  }
  next(err);
});
router.use(errors());

module.exports = router;
