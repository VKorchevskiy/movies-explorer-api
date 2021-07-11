const cors = require('cors');

const whitelist = [
  'http://localhost:3000',
  'https://diploma.vkorchevskiy.nomoredomains.club',
  'http://diploma.vkorchevskiy.nomoredomains.club',
];

module.exports.enableCors = () => cors({
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});
