require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const routes = require('./routes/index');
// const { processingError } = require('./middlewares/processingError');

const { MONGODB_URI, PORT } = require('./utils/config');

const app = express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use(routes);

// app.use(processingError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
