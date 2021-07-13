const { celebrate } = require('celebrate');
const Joi = require('joi');
const validator = require('validator');
const InvalidDataError = require('../errors/invalid-data-error');
const { INVALID_URL_ERROR } = require('./constants');

const validateUrl = (url) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new InvalidDataError(INVALID_URL_ERROR);
  }
  return url;
};

const createUserValidator = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const loginUserValidator = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const patchUserValidator = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
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
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  createUserValidator,
  loginUserValidator,
  patchUserValidator,
  createMovieValidator,
  movieIdValidator,
};
