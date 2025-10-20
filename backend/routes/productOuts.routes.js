import express from "express"
import { check, param } from "express-validator"
import { productOutController } from "../controllers/productOuts.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', authAuthorizePermissions("products-outs"), productOutController.getAll);

router.get('/:id',
  [
    authAuthorizePermissions("products-outs"),
    param('id').notEmpty().isInt().withMessage('id tiene que ser un número entero'),
    validate
  ],
  productOutController.getById
);

router.post('/', authAuthorizePermissions("products-outs"), productOutController.create);


export default router
