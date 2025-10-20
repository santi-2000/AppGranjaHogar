import db from "./index.js";

export const UnitsModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM units ORDER BY id");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM units WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name } = data;

    const [result] = await db.query(
      `INSERT INTO units (name) VALUES (?)`,
      [name]
    );

    return result;
  },
};
