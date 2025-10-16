import { productEntryVO } from "../valueObjects/products/productEntry.vo.js";
import { productEntriesModel } from "../models/productEntries.model.js";

export class ProductEntriesService {
  static async create(data) {
    const entryVO = new ProductEntryVO(data); //valida y normaliza
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