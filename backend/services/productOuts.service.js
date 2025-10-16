import { ProductOutModel } from "../models/productOuts.model.js";
import { ProductOutVO } from "../valueObjects/products/productOuts.vo.js";

export const ProductOutService = {
  async getAll() {
    const records = await ProductOutModel.getAll();

    if (!records || records.length === 0) {
      throw new Error("No hay registros");
    }

    const data = records.map(records => new ProductOutVO(records));

    return { success: true, data};
  },

  async getById(id) {
    const record = await ProductOutModel.getById(id);

    if (!record) {
      throw new Error("Registro no encontrado");
    }

    const data = new ProductOutVO(record);

    return { success: true, data };
  },

  async create(data) {
    const result = await ProductOutModel.create(data);

    if (!result || !result.insertId) {
      throw new Error("Error al ingresar la salida");
    }

    return {
      success: true,
      insertId: result.insertId,
      message: "Salida registrada correctamente"
    };
  },
};
