class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 429;
    this.name = 'TooManyRequestsError';
  }
}

module.exports = TooManyRequestsError;
