import express from "express"
import { check, param } from "express-validator"
import { unitsController } from "../controllers/units.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authMiddlewareLogged } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', authMiddlewareLogged, unitsController.getAll);

router.get('/:id',
  [
    authMiddlewareLogged,
    param('id').notEmpty().isInt().withMessage('id must be an integer'), 
    validate
  ],
  unitsController.getById
);

router.post('/', authMiddlewareLogged, unitsController.create);


export default router
