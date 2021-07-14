require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');
const corsOptions = require('./utils/cors-config');

const { MONGODB_URI, PORT } = require('./utils/config');
const { MONGOOSE_CONFIG } = require('./utils/constants');

const app = express();
app.use(helmet());
mongoose.connect(MONGODB_URI, MONGOOSE_CONFIG);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors(corsOptions));
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
