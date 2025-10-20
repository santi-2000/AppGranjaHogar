import { productOutModel } from "../models/productOuts.model.js";
import { AppError } from "../utils/error.util.js";
import { ProductOutVO } from "../valueObjects/products/productOuts.vo.js";

class ProductOutService {
  async getAll() {
    const records = await productOutModel.getAll();

    if (!records || records.length === 0) throw new AppError("No hay registros");
    const data = records.map(records => new ProductOutVO(records));

    return { success: true, data };
  }

  async getById(id) {
    const record = await productOutModel.getById(id);

    if (!record) throw new AppError("Registro no encontrado");


    const data = new ProductOutVO(record);

    return { success: true, data };
  }

  async create(data) {
    const result = await productOutModel.create(data);

    if (!result || !result.insertId) throw new AppError("Error al ingresar la salida");

    return {
      success: true,
      insertId: result.insertId,
      message: "Salida registrada correctamente"
    };
  }
}

export const productOutService = new ProductOutService();
