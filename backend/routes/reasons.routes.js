import express from "express"
import { check, param } from "express-validator"
import { reasonsController } from "../controllers/reasons.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authAuthorizePermissions } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', authAuthorizePermissions("products-outs"), reasonsController.getAll);

router.get('/:id',
  [
    authAuthorizePermissions("products-outs"),
    param('id').isInt().withMessage('id must be an integer'),
    validate
  ],
  reasonsController.getById
);

router.post('/', authAuthorizePermissions("products-outs"), reasonsController.create);

export default router