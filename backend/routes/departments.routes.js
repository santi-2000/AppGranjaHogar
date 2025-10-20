import express from "express"
import { check, param } from "express-validator"
import { departmentsController } from "../controllers/departments.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authMiddlewareLogged } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', departmentsController.getAll);

router.get('/:id',
  [
    authMiddlewareLogged,
    param('id').isInt().withMessage('id debe de ser un número entero'),
    validate
  ],
  departmentsController.getById
);

router.post('/', authMiddlewareLogged, departmentsController.create);


export default router
