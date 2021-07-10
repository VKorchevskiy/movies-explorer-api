const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const InvalidDataError = require('../errors/invalid-data-error');

const convertMovie = (movie) => {
  const convertedMovie = {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    trailer: movie.trailer,
    thumbnail: movie.thumbnail,
    movieId: movie.movieId,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    _id: movie._id,
  };
  return convertedMovie;
};

const processInvalidMovieError = (err, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new InvalidDataError('Переданы некорректные данные фильма.'));
  }
};

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.status(200).send(movies
      .filter((movie) => `${movie.owner}` === `${req.user._id}`)
      .map((movie) => convertMovie(movie))))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId: _id } = req.params;

  Movie.findById({ _id })
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if ((req.user._id.toString()) !== (movie.owner._id).toString()) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы.');
      }
      movie.deleteOne();
      return res.status(200).send({ message: 'Фильм с указанным _id удален.' });
    })
    .catch((err) => {
      processInvalidMovieError(err, next);
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => res.status(201).send(convertMovie(movie)))
    .catch((err) => {
      processInvalidMovieError(err, next);
      next(err);
    });
};
