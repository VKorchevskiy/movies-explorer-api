const { isCelebrateError } = require('celebrate');
const InvalidDataError = require('../errors/invalid-data-error');
const { INVALID_DATA_ERROR } = require('../utils/constants');

module.exports.handleCelebrateError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    next(new InvalidDataError(INVALID_DATA_ERROR));
  }
  next(err);
};
