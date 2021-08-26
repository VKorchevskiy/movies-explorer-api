const { MONGODB_URI = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const PORT = +process.env.PORT || 3000;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'Super-strong-secret-key' } = process.env;
const { SALT_ROUNDS = 10 } = +process.env.SALT_ROUNDS;

module.exports = {
  MONGODB_URI,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  SALT_ROUNDS,
};
