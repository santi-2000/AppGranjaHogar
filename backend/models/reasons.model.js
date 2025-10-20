import db from "./index.js";

export const ReasonsModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM reasons ORDER BY id");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM reasons WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name } = data;

    const [result] = await db.query(
      `INSERT INTO reasons (name) VALUES (?)`,
      [name]
    );

    return result;
  },
};
