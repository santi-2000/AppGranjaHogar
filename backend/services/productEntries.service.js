import { ProductEntryVO } from "../valueObjects/products/productEntries.vo.js";
import { productEntriesModel } from "../models/productEntries.model.js";

class ProductEntriesService {
  async create(data) {
    const entryVO = new ProductEntryVO(data);
    const id = await productEntriesModel.create(entryVO);
    return { id, ...entryVO };
  }

  async getAll() {
    return await productEntriesModel.getAll();
  }

  async getById(id) {
    const entry = await productEntriesModel.getById(id);
    if (!entry) throw new Error("Entrada no encontrada");
    return entry;
  }
}

export const productEntriesService = new ProductEntriesService();