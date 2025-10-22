/**
 * @module utils/error
 * @description Custom error class for application errors.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fallido' : 'Error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
