require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');

const { MONGODB_URI, PORT } = require('./utils/config');
const { MONGOOSE_CONFIG } = require('./utils/constants');

const app = express();
mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors());
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
