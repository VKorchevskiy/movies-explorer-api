const UnprocessableEntity = require('../errors/unprocessable-entity');
const CORS_ERROR = require('./constants');

const whiteList = [
  'http://localhost:3000',
  'https://diploma.vkorchevskiy.nomoredomains.club',
  'http://diploma.vkorchevskiy.nomoredomains.club',
];

module.exports.corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new UnprocessableEntity(CORS_ERROR));
    }
  },
};
