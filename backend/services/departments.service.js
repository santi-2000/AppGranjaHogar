import { departmentsModel } from "../models/departments.model.js";
import { AppError } from "../utils/error.util.js";
import { DepartmentsVO } from "../valueObjects/departments/departments.vo.js";

export class DepartmentsService {
  async getAll() {

    const records = await departmentsModel.getAll();
    if (!records || records.length === 0) throw new AppError("No hay registros", 404);
    
    const data = records.map(records => new DepartmentsVO(records));

    return { success: true, data};
  }

  async getById(id) {
    const record = await departmentsModel.getById(id);

    if (!record) throw new AppError("Registro no encontrado", 404);

    const data = new DepartmentsVO(record);

    return { success: true, data };
  }

  async create(data) {
    const result = await departmentsModel.create(data);

    if (!result || !result.insertId) throw new AppError("Error al ingresar departamento", 500);
    
    return {
      success: true,
      insertId: result.insertId,
      message: "Departamento agregado correctamente"
    };
  }
};

export const departmentsService = new DepartmentsService();