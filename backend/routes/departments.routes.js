import express from "express"
import { check, param } from "express-validator"
import { DepartmentsController } from "../controllers/departments.controller.js";

const router = express.Router();


router.get('/', DepartmentsController.getAll);

router.get('/:id',
  [param('id').isInt().withMessage('id must be an integer')],
  DepartmentsController.getById
);

router.post('/', DepartmentsController.create);


export default router
