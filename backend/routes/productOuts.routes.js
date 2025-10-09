import express from "express"
import { check, param } from "express-validator"
import { ProductOutController } from "../controllers/productOuts.controller.js";

const router = express.Router();

const validateProductOut = [
  check('user_id').isInt().withMessage('user_id must be an integer'),
  check('product_id').isInt().withMessage('product_id must be an integer'),
  check('reason_id').isInt().withMessage('reason_id must be an integer'),
  check('department_id').isInt().withMessage('department_id must be an integer'),
  check('unit_id').isInt().withMessage('unit_id must be an integer'),
  check('quantity').isFloat({ gt: 0 }).withMessage('quantity must be greater than 0'),
];

router.get('/', ProductOutController.getAll);

router.get('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  ProductOutController.getById
);

router.post('/', validateProductOut, ProductOutController.create);

router.put('/:id',
  [
    param('id').isInt().withMessage('id must be an integer'),
    ...validateProductOut
  ],
  ProductOutController.update
);

router.delete('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  ProductOutController.remove
);

export default router
