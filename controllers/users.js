const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, SALT_ROUNDS } = require('../utils/config');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');
const InvalidDataError = require('../errors/invalid-data-error');
const INVALID_USER_DATA_ERROR = require('../utils/constants');
const INVALID_EMAIL_OR_PASSWORD_ERROR = require('../utils/constants');
const USER_EXISTS_ERROR = require('../utils/constants');

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
    next(new InvalidDataError(INVALID_USER_DATA_ERROR));
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
        throw new AuthError(INVALID_EMAIL_OR_PASSWORD_ERROR);
      }
      return bcrypt.compare(password, user.password, (err, isValid) => {
        if (!isValid) {
          return next(new AuthError(INVALID_EMAIL_OR_PASSWORD_ERROR));
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
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new ConflictError(USER_EXISTS_ERROR);
        }
        return User.create({
          name,
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
