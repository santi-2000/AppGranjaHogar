import pool from "../models/index.js";

export const ProductOutModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM product_outs');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM product_outs WHERE id = ?', [id]);
    return rows;
  },

  async create(data) {
    const { user_id, product_id, reason_id, department_id, unit_id, quantity, notes } = data;
    const [result] = await pool.query(
      `INSERT INTO product_outs (user_id, product_id, reason_id, department_id, unit_id, quantity, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [user_id, product_id, reason_id, department_id, unit_id, quantity, notes]
    );
    return result;
  }
};