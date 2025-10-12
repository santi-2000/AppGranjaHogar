import { ProductOutModel } from "../models/productOuts.model.js";
import { ProductOutVO } from "../valueObjects/products/productOuts.vo.js";

export const ProductOutService = {
  async getAll() {
    const productOut = await ProductOutModel.getAll();
    if (productOut.length === 0) throw new Error('No hay resgistros')
    return productOut;
  },

  async getById(id) {
    const productOut = await ProductOutModel.getById(id);
    if (productOut == 0) throw new Error('Registro no encontrado');
    return productOut;
  },

  async create(data) {
    return await ProductOutModel.create(data);
  },

  async update(id, data) {
    await ProductOutService.getById(id);
    await ProductOutModel.update(id, data);
  },

  async remove(id) {
    const productOut = await ProductOutService.getById(id);
    if (productOut == 0) throw new Error('Registro no encontrado');
    await ProductOutModel.remove(id);
  }
};

