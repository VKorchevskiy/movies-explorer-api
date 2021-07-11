require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');

const { MONGODB_URI, PORT } = require('./utils/config');
const { MONGOOSE_CONFIG } = require('./utils/constants');

// const WHITE_LIST = [
//   'http://localhost:3001',
//   'https://diploma.vkorchevskiy.nomoredomains.club',
//   'http://diploma.vkorchevskiy.nomoredomains.club',
// ];

// const CORS_OPTIONS = {
//   origin: (origin, callback) => {
//     if (WHITE_LIST.indexOf(origin) !== -1) {
//       return callback(null, true);
//     }
//     return callback(new Error('111'));
//   },
// };

const app = express();
app.use(helmet());
mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
// app.use(cors(CORS_OPTIONS));
app.use(cors());

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     if (WHITE_LIST.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
// }));

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
