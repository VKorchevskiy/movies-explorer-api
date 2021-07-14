const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { createMovieValidator, movieIdValidator } = require('../utils/validators');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', movieIdValidator, deleteMovieById);

module.exports = router;
