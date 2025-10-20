import { DepartmentsModel } from "../models/departments.model.js";
import { DepartmentsVO } from "../valueObjects/departments/departments.vo.js";

export const DepartmentsService = {
  async getAll() {
    const records = await DepartmentsModel.getAll();

    if (!records || records.length === 0) {
      throw new Error("No hay registros");
    }

    const data = records.map(records => new DepartmentsVO(records));

    return { success: true, data};
  },

  async getById(id) {
    const record = await DepartmentsModel.getById(id);

    if (!record) {
      throw new Error("Registro no encontrado");
    }

    const data = new DepartmentsVO(record);

    return { success: true, data };
  },

  async create(data) {
    const result = await DepartmentsModel.create(data);

    if (!result || !result.insertId) {
      throw new Error("Error al ingresar departamento,");
    }

    return {
      success: true,
      insertId: result.insertId,
      message: "Departamento agregado correctamente"
    };
  },
};
