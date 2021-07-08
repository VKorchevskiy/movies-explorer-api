const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { tupe: String, required: true },
  description: { tupe: String, required: true },
  image: {
    tupe: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: (props) => `${props.value} ссылка некорректная.`,
    },
  },
  trailer: {
    tupe: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: (props) => `${props.value} ссылка некорректная.`,
    },
  },
  thumbnail: {
    tupe: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: (props) => `${props.value} ссылка некорректная.`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { type: Number, required: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
});

module.exports = mongoose.model('user', movieSchema);
