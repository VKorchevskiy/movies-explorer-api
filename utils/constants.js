// error messages
const INVALID_URL_ERROR = 'Передан невалидный URL.';
const INVALID_DATA_ERROR = 'Переданы некорректные данные.';
const INVALID_USER_DATA_ERROR = 'Переданы некорректные данные пользователя.';
const INVALID_MOVIE_DATA_ERROR = 'Переданы некорректные данные фильма.';
const INVALID_EMAIL_ERROR = 'почта некорректная.';
const INVALID_EMAIL_OR_PASSWORD_ERROR = 'Неправильные почта или пароль.';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const AUTH_ERROR = 'Необходима авторизация.';
const USER_EXISTS_ERROR = 'Такой пользователь уже существует.';
const USER_EMAIL_CONFLICT_ERROR = 'Попробуйте другой почтовый адрес.';
const NOT_FOUND_ERROR = 'Ресурс не найден.';
const NOT_FOUND_MOVIE_ERROR = 'Фильм с указанным _id не найден.';
const CAN_NOT_DELETE_OTHER_PEOPLE_MOVIES_ERROR = 'Нельзя удалять чужие фильмы.';
const TOO_MANY_REQUEST_ERROR = 'Слишком много запросов.';
const CORS_ERROR = 'Недопустимо по политике безопасности (CORS)';

// allow messages
const MOVIE_DELETE_MESSAGE = 'Фильм с указанным _id удален.';

// mongoose config
const MONGOOSE_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  INVALID_URL_ERROR,
  INVALID_DATA_ERROR,
  INVALID_USER_DATA_ERROR,
  INVALID_MOVIE_DATA_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_EMAIL_OR_PASSWORD_ERROR,
  SERVER_ERROR,
  AUTH_ERROR,
  USER_EXISTS_ERROR,
  USER_EMAIL_CONFLICT_ERROR,
  NOT_FOUND_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  CAN_NOT_DELETE_OTHER_PEOPLE_MOVIES_ERROR,
  TOO_MANY_REQUEST_ERROR,
  CORS_ERROR,
  MOVIE_DELETE_MESSAGE,
  MONGOOSE_CONFIG,
};
