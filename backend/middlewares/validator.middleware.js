/**
 * @module middlewares/validate
 * @description Middleware to validate request using express-validator. Throws AppError if validation fails.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */
import { validationResult } from 'express-validator'
import { AppError } from '../utils/error.util.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(errors.array().map(error => error.msg), 400);
  next();
};