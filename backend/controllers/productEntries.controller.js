import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productEntriesService } from "../services/productEntries.service.js";

export class ProductEntriesController {
  constructor() {
    this.createEntry = catchAsync(this.createEntry.bind(this));
    this.getAllEntries = catchAsync(this.getAllEntries.bind(this));
    this.getEntryById = catchAsync(this.getEntryById.bind(this));
  }

  async createEntry(req, res) {
    const newEntry = await productEntriesService.create(req.body);
    res.status(201).json({
      message: "Entrada registrada correctamente",
      data: newEntry,
    });
  }

  async getAllEntries(req, res) {
    const entries = await productEntriesService.getAll();
    res.status(200).json(entries)
  }

  async getEntryById(req, res) {
    const entry = await productEntriesService.getById(req.params.id);
    res.status(200).json(entry);
  }
}

export const productEntriesController = new ProductEntriesController();