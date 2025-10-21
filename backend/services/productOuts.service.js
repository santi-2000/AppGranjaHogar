/**
 * @module services/productOuts
 * @description
 * This module defines the 'ProductOutService' class, which encapsulates the business logic
 * for product out operations. It acts as an intermediary, utilizing the 'productOutModel'
 * for database access and transforming the data using 'ProductOutVO'.
 * It includes methods for retrieving, fetching by ID, and creating product out records,
 * handling error states such as 'no records found' or 'insertion failure'.
 * @author Samuel Isaac Lopez Mar
*/

import { productOutModel } from "../models/productOuts.model.js";
import { AppError } from "../utils/error.util.js";
import { ProductOutVO } from "../valueObjects/products/productOuts.vo.js";

/**
 * Service class responsible for business logic related to product outs.
 * @class
 */
class ProductOutService {
  /**
   * Retrieves all product out records, maps them to Value Objects, and handles the 'not found' case.
   * @async
   * @memberof ProductOutService
   * @returns {Promise<Object>} An object containing the success status and an array of ProductOutVOs.
   * @throws {AppError} If no records are found in the database.
   * @example
   * const result = await productOutService.getAll();
   * // { success: true, data: [ProductOutVO, ProductOutVO, ...] }
   */
  async getAll() {
    const records = await productOutModel.getAll();

    if (!records || records.length === 0) throw new AppError("No hay registros");
    const data = records.map(record => new ProductOutVO(record));

    return { success: true, data };
  }

  /**
   * Retrieves a single product out record by ID and maps it to a Value Object.
   * @async
   * @memberof ProductOutService
   * @param {number} id - The ID of the product out record to retrieve.
   * @returns {Promise<Object>} An object containing the success status and a single ProductOutVO.
   * @throws {AppError} If the record is not found with the given ID.
   * @example
   * const result = await productOutService.getById(5);
   * // { success: true, data: ProductOutVO }
   */
  async getById(id) {
    const record = await productOutModel.getById(id);

    if (!record) throw new AppError("Registro no encontrado");

    const data = new ProductOutVO(record);

    return { success: true, data };
  }

  /**
   * Creates a new product out record in the database.
   * @async
   * @memberof ProductOutService
   * @param {Object} data - The data required for the new product out record.
   * @returns {Promise<Object>} An object containing the success status, the insert ID, and a confirmation message.
   * @throws {AppError} If the database insertion fails (no insertId returned).
   * @example
   * const result = await productOutService.create({ user_id: 1, product_id: 15, reason_id: 3, department_id: 2, unit_id: 4, quantity: 10, notes: "Donativo a otra granja hogar."});
   * // { success: true, insertId: 25, message: "Salida registrada correctamente" }
   */
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