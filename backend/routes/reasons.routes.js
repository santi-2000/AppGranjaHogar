import express from "express"
import { check, param } from "express-validator"
import { reasonsController } from "../controllers/reasons.controller.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

router.get('/', reasonsController.getAll);

router.get('/:id',
  [
    param('id').isInt().withMessage('id must be an integer'),
    validate
  ],
  reasonsController.getById
);

router.post('/', reasonsController.create);


export default router
