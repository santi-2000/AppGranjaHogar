import express from "express"
import { check, param } from "express-validator"
import { UnitsController } from "../controllers/units.controller.js";

const router = express.Router();


router.get('/', UnitsController.getAll);

router.get('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  UnitsController.getById
);

router.post('/', UnitsController.create);


export default router
