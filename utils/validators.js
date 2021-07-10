const { celebrate } = require('celebrate');
const Joi = require('joi');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-error');

const validateUrl = (url) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new InvalidDataError('Переданы некорректные данные.');
  }
  return url;
};

const userValidator = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const movieSchemaValidator = celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailer: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  userValidator,
  movieSchemaValidator,
  movieIdValidator,
};
