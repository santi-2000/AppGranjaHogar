import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productOutService } from "../services/productOuts.service.js";
import { validationResult } from "express-validator";

export class ProductOutController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getById = catchAsync(this.getById.bind(this));
    this.create = catchAsync(this.create.bind(this));
  }

  async getAll(req, res) {
    const result = await productOutService.getAll();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await productOutService.getById(req.params.id);
    res.status(200).json(result);
  }

  async create(req, res) {
    const result = await productOutService.create(req.body);
    res.status(201).json(result)
  }
}

export const productOutController = new ProductOutController();