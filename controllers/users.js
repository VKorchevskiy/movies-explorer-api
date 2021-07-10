const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, SALT_ROUNDS } = require('../utils/config');
// const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');
const InvalidDataError = require('../errors/invalid-data-error');

const convertUser = (user) => {
  const convertedUser = {
    name: user.name,
    email: user.email,
    _id: user._id,
  };
  return convertedUser;
};

const processInvalidUserError = (err, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new InvalidDataError('Переданы некорректные данные пользователя.'));
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.status(200).send(convertUser(user)))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль.');
      }
      return bcrypt.compare(password, user.password, (err, isValid) => {
        if (!isValid) {
          return next(new AuthError('Неправильные почта или пароль.'));
        }
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new ConflictError('Такой пользователь уже существует.');
        }
        return User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((userData) => res.status(200).send(convertUser(userData)));
      })
      .catch((error) => {
        processInvalidUserError(error, next);
        next(error);
      });
  });
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).send(convertUser(user)))
    .catch((err) => {
      processInvalidUserError(err, next);
      next(err);
    });
};
