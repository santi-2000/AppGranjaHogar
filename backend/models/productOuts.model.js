/**
 * @module models/productOut
 * @description
 * This module defines the 'ProductOutModel' class, which handles direct interactions with the
 * database for product out records. It performs operations such as retrieving all product outs,
 * fetching a single record by ID, and inserting new product out entries.
 * @author Samuel Isaac Lopez Mar
 */

import db from "./index.js";

/**
 * Model class for managing product out database operations.
 * @class
 */
class ProductOutModel {
  /**
   * Retrieves all product outs from the database, ordered by creation date (newest first).
   * @async
   * @memberof ProductOutModel
   * @returns {Promise<Object[]>} A promise that resolves to an array of product out objects.
   * @example
   * const records = await productOutModel.getAll();
   * console.log(records);
   * // [{ id: 10, user_id: 2, product_id: 8, reason_id: 2, department_id: 1, unit_id: 4, quantity: 4, notes: "Limpieza general", created_at: "2025-10-20T10:00:00Z" },
   * // { id: 9, user_id: 2, product_id: 8, reason_id: 2, department_id: 1, unit_id: 4, quantity: 4, notes: "Limpieza general", created_at: "2025-10-19T7:00:00Z" }]
   */
  async getAll() {
    const [rows] = await db.query("SELECT * FROM product_outs ORDER BY created_at DESC");
    return rows;
  }

  /**
   * Retrieves a single product out record by its ID.
   * @async
   * @memberof ProductOutModel
   * @param {number} id - The ID of the product out to retrieve.
   * @returns {Promise<Object>} The product out object if found.
   * @example
   * const out = await productOutModel.getById(10);
   * console.log(out);
   * // { id: 10, user_id: 2, product_id: 8, reason_id: 3, department_id: 1, unit_id: 4, quantity: 4, notes: "Limpieza general", created_at: "2025-10-20T10:00:00Z" }
   */
  async getById(id) {
    const [rows] = await db.query("SELECT * FROM product_outs WHERE id = ?", [id]);
    return rows[0];
  }

  /**
   * Inserts a new product out record into the database.
   * @async
   * @memberof ProductOutModel
   * @param {Object} data - The product out data.
   * @returns {Promise<Object>} The MySQL insert result object containing 'insertId' and affected rows.
   * @example
   * const newOut = await productOutModel.create({ user_id: 1, product_id: 15, reason_id: 3, department_id: 2, unit_id: 4, quantity: 10, notes: "Donativo a otra granja hogar."});
   * console.log(newOut);
   * //{ fieldCount: 0, affectedRows: 1, insertId: 4, info: "", serverStatus: 2, warningStatus: 0, changedRows: 0}
   */
  async create(data) {
    const { user_id, product_id, reason_id, department_id, unit_id, quantity, notes } = data;
    const [result] = await db.query(
      `INSERT INTO product_outs (user_id, product_id, reason_id, department_id, unit_id, quantity, notes) VALUES (?,?,?,?,?,?,?)`,
      [user_id, product_id, reason_id, department_id, unit_id, quantity, notes]
    );

    return result;
  }
}

export const productOutModel = new ProductOutModel();