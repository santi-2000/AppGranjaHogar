import { ProductEntryVO } from "../valueObjects/products/productEntries.vo.js";
import { ProductEntriesModel } from "../models/productEntries.model.js";

export class ProductEntriesService {
  static async create(data) {
    const entryVO = new ProductEntryVO(data);
    const id = await ProductEntriesModel.create(entryVO);
    return { id, ...entryVO };
  }

  static async getAll() {
    return await ProductEntriesModel.getAll();
  }

  static async getById(id) {
    const entry = await ProductEntriesModel.getById(id);
    if (!entry) throw new Error("Entrada no encontrada");
    return entry;
  }
}