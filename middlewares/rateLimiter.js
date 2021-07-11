const rateLimit = require('express-rate-limit');

const TooManyRequestsError = require('../errors/too-many-requests-error');
const { TOO_MANY_REQUEST_ERROR } = require('../utils/constants');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res, next) => {
    next(new TooManyRequestsError(TOO_MANY_REQUEST_ERROR));
  },
});
