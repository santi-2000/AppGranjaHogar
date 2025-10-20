import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { reasonsService } from "../services/reasons.service.js";
import { validationResult } from "express-validator";

export class ReasonsController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getById = catchAsync(this.getById.bind(this));
    this.create = catchAsync(this.create.bind(this));
  }

  async getAll(req, res) {
    const result = await reasonsService.getAll();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await reasonsService.getById(req.params.id);
    res.status(200).json(result);
  }

  async create(req, res) {
    const result = await reasonsService.create(req.body);
    res.status(201).json(result);
  }
};

export const reasonsController = new ReasonsController();