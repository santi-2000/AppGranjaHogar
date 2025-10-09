class ApiError extends Error {
  constructor(statusCode, message = 'Something went wrong') {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Invalid data provided.') {
    super(400, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found.') {
    super(404, message);
  }
}

export default { ApiError, BadRequestError, NotFoundError };