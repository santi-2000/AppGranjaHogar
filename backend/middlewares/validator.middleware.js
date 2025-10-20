import { validationResult } from 'express-validator'
import { AppError } from '../utils/error.util.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(errors.array().map(error => error.msg), 400);
  next();
};