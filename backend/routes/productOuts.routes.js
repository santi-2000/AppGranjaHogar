import express from "express"
import { check, param } from "express-validator"
import { ProductOutController } from "../controllers/productOuts.controller.js";

const router = express.Router();


router.get('/', ProductOutController.getAll);

router.get('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  ProductOutController.getById
);

router.post('/', ProductOutController.create);


export default router
