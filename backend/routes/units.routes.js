import express from "express"
import { check, param } from "express-validator"
import { unitsController } from "../controllers/units.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

router.get('/', unitsController.getAll);

router.get('/:id',
  [
    param('id').notEmpty().isInt().withMessage('id must be an integer'), 
    validate
  ],
  unitsController.getById
);

router.post('/', unitsController.create);


export default router
