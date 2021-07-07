const express = require('express');

const {
  // MONGODB_URI,
  PORT,
  // NODE_ENV,
  // JWT_SECRET,
  // SALT_ROUNDS,
} = require('./utils/config');

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
