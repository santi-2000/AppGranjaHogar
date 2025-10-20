import db from "./index.js";

export const DepartmentsModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM departments ORDER BY id");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM departments WHERE id = ?", [id]);
    return rows[0];
  },

  async create(data) {
    const { name } = data;

    const [result] = await db.query(
      `INSERT INTO departments (name) VALUES (?)`,
      [name]
    );

    return result;
  },
};
