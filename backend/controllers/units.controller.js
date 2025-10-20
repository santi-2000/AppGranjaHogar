import { unitsService } from "../services/units.service.js";
import { validationResult } from "express-validator";
import { catchAsync } from "../middlewares/catchAsync.middleware.js";

export class UnitsController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getById = catchAsync(this.getById.bind(this));
    this.create = catchAsync(this.create.bind(this));
  }
  async getAll(req, res) {
    const result = await unitsService.getAll();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await unitsService.getById(req.params.id);
    res.status(200).json(result);
  }

  async create(req, res) {
    const result = await unitsService.create(req.body);
    res.status(201).json(result);
  }
};

export const unitsController = new UnitsController();