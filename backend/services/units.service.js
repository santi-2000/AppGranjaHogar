import { UnitsModel } from "../models/units.model.js";
import { UnitsVO } from "../valueObjects/units/units.vo.js";

export const UnitsService = {
  async getAll() {
    const records = await UnitsModel.getAll();

    if (!records || records.length === 0) {
      throw new Error("No hay registros");
    }

    const data = records.map(records => new UnitsVO(records));

    return { success: true, data};
  },

  async getById(id) {
    const record = await UnitsModel.getById(id);

    if (!record) {
      throw new Error("Registro no encontrado");
    }

    const data = new UnitsVO(record);

    return { success: true, data };
  },

  async create(data) {
    const result = await UnitsModel.create(data);

    if (!result || !result.insertId) {
      throw new Error("Error al ingresar unidad,");
    }

    return {
      success: true,
      insertId: result.insertId,
      message: "Unidad agregada correctamente"
    };
  },
};
