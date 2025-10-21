import db from "./index.js";

class ProductOutModel {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM product_outs ORDER BY created_at DESC");
    return rows;
  }

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM product_outs WHERE id = ?", [id]);
    return rows[0];
  }

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