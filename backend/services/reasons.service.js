import { reasonsModel } from "../models/reasons.model.js";
import { AppError } from "../utils/error.util.js";
import { ReasonsVO } from "../valueObjects/reasons/reasons.vo.js";

export class ReasonsService {
  async getAll() {
    const records = await reasonsModel.getAll();

    if (!records || records.length === 0) throw new AppError("No hay registros", 404);

    const data = records.map(record => new ReasonsVO(record));

    return { success: true, data };
  }

  async getById(id) {
    const record = await reasonsModel.getById(id);

    if (!record) throw new AppError("Registro no encontrado", 404);
    
    const data = new ReasonsVO(record);

    return { success: true, data };
  }

  async create(data) {
    const result = await reasonsModel.create(data);

    if (!result || !result.insertId) throw new AppError("Error al ingresar motivo", 500);

    return {
      success: true,
      insertId: result.insertId,
      message: "Motivo agregado correctamente"
    };
  }
};

export const reasonsService = new ReasonsService();