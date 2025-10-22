/**
 * @function middlewares/catchAsync
 * @description Wraps an async middleware function to catch errors and pass them to Express error handler.
 * @param {Function} fn - The asynchronous middleware function to wrap.
 * @returns {Function} A middleware function that handles errors from the async function.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
