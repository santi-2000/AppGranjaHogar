/**
 * @file Modelo para gestionar las entradas de productos en la base de datos.
 * @author Dania Sagarnaga Macías
 */

import db from "../models/index.js";

class ProductEntriesModel {
  async create(entry) {
  /**
   *  Crea una nueva entrada de producto en la base de datos. 
   * @param {*} entry 
   * @returns result.insertId - ID de la nueva entrada creada.
   */
    console.log(entry)
    const [result] = await db.query(
      `INSERT INTO product_entries 
      (product_id, user_id, unit_id, is_donation, quantity, cost, exp_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.product_id,
        entry.user_id,
        entry.unit_id,
        entry.is_donation,
        entry.quantity,
        entry.cost,
        entry.exp_date,
      ]
    );
    return result.insertId;
  }

  async getAll() {
    /**
     * Obtiene todas las entradas de productos con información adicional del producto y la unidad.
     * @returns {Array} Lista de entradas de productos.
     */
    const [rows] = await db.query(`
      SELECT pe.*, p.name AS product_name, u.name AS unit_name
      FROM product_entries pe
      JOIN products p ON pe.product_id = p.id
      JOIN units u ON pe.unit_id = u.id
      ORDER BY pe.created_at DESC
    `);
    return rows;
  }

  async getById(id) {
    /**
     * Obtiene una entrada de producto por su ID con información adicional del producto y la unidad.
     * @param {number} id - ID de la entrada de producto.
     * @returns {Object} Entrada de producto correspondiente al ID.
     */
    const [rows] = await db.query(`
    SELECT 
      pe.*, 
      p.name AS product_name, 
      u.name AS unit_name
    FROM product_entries pe
    JOIN products p ON pe.product_id = p.id
    JOIN units u ON pe.unit_id = u.id
    WHERE pe.id = ?
    `,
    [id]
  );
  return rows[0];
  }
}

export const productEntriesModel = new ProductEntriesModel();