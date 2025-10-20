import express from "express"
import { check, param } from "express-validator"
import { ReasonsController } from "../controllers/reasons.controller.js";

const router = express.Router();


router.get('/', ReasonsController.getAll);

router.get('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  ReasonsController.getById
);

router.post('/', ReasonsController.create);


export default router
