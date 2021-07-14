class UnprocessableEntity extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
    this.name = 'UnprocessableEntity';
  }
}

module.exports = UnprocessableEntity;
