import { unitsModel } from "../models/units.model.js";
import { AppError } from "../utils/error.util.js";
import { UnitsVO } from "../valueObjects/units/units.vo.js";

export class UnitsService {
  async getAll() {
    const records = await unitsModel.getAll();
    if (!records || records.length === 0) throw new AppError("No hay registros", 404);
    
    const data = records.map(records => new UnitsVO(records));
    return { success: true, data};
  }

  async getById(id) {
    const record = await unitsModel.getById(id);
    if (!record) throw new AppError("Registro no encontrado", 404);

    const data = new UnitsVO(record);
    return { success: true, data };
  }

  async create(data) {
    const result = await unitsModel.create(data);
    if (!result || !result.insertId) throw new AppError("Error al ingresar unidad", 500);

    return {
      success: true,
      insertId: result.insertId,
      message: "Unidad agregada correctamente"
    };
  }
};

export const unitsService = new UnitsService();