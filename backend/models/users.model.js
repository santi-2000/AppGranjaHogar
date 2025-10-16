import db from "../models/index.js"

export const loginModel = async (username) => {
    const sql = `SELECT * FROM users WHERE username = ?`
    return await db.query(sql, [username]);
}

export const UsersModel = {
  async create({ name, last_name, username, passwordHash }) {
    const sql = `
      INSERT INTO users (name, username, last_name, password_hash)
      VALUES (?, ?, ?, ?)
    `;
    const params = [name, username, last_name, passwordHash];
    const [result] = await db.query(sql, params);
    return result;
  },

  async updatePassword({ userId, newPasswordHash }) {
    const sql = `
      UPDATE users 
      SET password_hash = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [newPasswordHash, userId];
    const [result] = await db.query(sql, params);
    return result;
  },

  async getUserById(userId) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await db.query(sql, [userId]);
    return rows[0];
  }
};
