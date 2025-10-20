import db from "../models/index.js";

class ProductEntriesModel {
  async create(entry) {
    const [result] = await db.query(
      `INSERT INTO product_entries 
      (product_id, user_id, unit_id, is_donation, quantity, cost, exp_date, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.product_id,
        entry.user_id,
        entry.unit_id,
        entry.is_donation,
        entry.quantity,
        entry.cost,
        entry.exp_date,
        entry.created_at,
      ]
    );
    return result.insertId;
  }

  async getAll() {
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