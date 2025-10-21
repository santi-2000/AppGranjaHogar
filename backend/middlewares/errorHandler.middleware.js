/**
 * @module middlewares/errorHandler
 * @description Express error-handling middleware that logs the error and sends a JSON response with error details.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
