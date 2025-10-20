import { ReasonsModel } from "../models/reasons.model.js";
import { ReasonsVO } from "../valueObjects/reasons/reasons.vo.js";

export const ReasonsService = {
  async getAll() {
    const records = await ReasonsModel.getAll();

    if (!records || records.length === 0) {
      throw new Error("No hay registros");
    }

    const data = records.map(records => new ReasonsVO(records));

    return { success: true, data};
  },

  async getById(id) {
    const record = await ReasonsModel.getById(id);

    if (!record) {
      throw new Error("Registro no encontrado");
    }

    const data = new ReasonsVO(record);

    return { success: true, data };
  },

  async create(data) {
    const result = await ReasonsModel.create(data);

    if (!result || !result.insertId) {
      throw new Error("Error al ingresar motivo,");
    }

    return {
      success: true,
      insertId: result.insertId,
      message: "Motivo agregado correctamente"
    };
  },
};
