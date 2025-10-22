import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productEntriesService } from "../services/productEntries.service.js";

export class ProductEntriesController {
  constructor() {
    this.createEntry = catchAsync(this.createEntry.bind(this));
    this.getAllEntries = catchAsync(this.getAllEntries.bind(this));
    this.getEntryById = catchAsync(this.getEntryById.bind(this));
  }
   
  /**
   * @description Crea una nueva entrada en product_entries
   * y actualiza automáticamente el actual_stock del producto asociado.
   * @author Dania Sagarnaga Macías
   */
  async createEntry(req, res) {  
    const data = {
    ...req.body,
    user_id: req.body.user_id };

    const result = await productEntriesService.create(data);

    res.status(201).json({
      message: result.message,
      data: {
      entry: result.entry,
      updated_stock: result.updated_stock
        
      }
    });
  }

  /**
   * @description Obtiene todas las entradas de productos
   */
  async getAllEntries(req, res) {
    const entries = await productEntriesService.getAll();
    res.status(200).json(entries);
  }

  /**
   * @description Obtiene una entrada específica por su ID
   */
  async getEntryById(req, res) {
    const entry = await productEntriesService.getById(req.params.id);
    res.status(200).json(entry);
  }
}

export const productEntriesController = new ProductEntriesController();