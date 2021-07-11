const jwt = require('jsonwebtoken');
const AUTH_ERROR = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');
const AuthError = require('../errors/auth-error');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_ERROR);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(AUTH_ERROR);
  }

  req.user = payload;
  return next();
};
