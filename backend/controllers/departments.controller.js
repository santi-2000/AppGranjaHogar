import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { departmentsService } from "../services/departments.service.js";
import { validationResult } from "express-validator";

export class DepartmentsController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getById = catchAsync(this.getById.bind(this));
    this.create = catchAsync(this.create.bind(this));
  }

  async getAll(req, res) {
    const result = await departmentsService.getAll();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await departmentsService.getById(req.params.id);
    res.status(200).json(result);
  }

  async create(req, res) {
    const result = await departmentsService.create(req.body);
    res.status(201).json(result);
  }
};

export const departmentsController = new DepartmentsController();