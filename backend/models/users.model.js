import db from "../models/index.js"

/**
 * Users Model
 * @module UsersModel
 * @description This module provides methods for interacting with the 'users' table in the database.
 *              It includes functions for user authentication, creation, permission management,
 *              password updates, and user deletion.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { usersModel } from '../models/users.model.js';
 * 
 * const user = await usersModel.loginModel('john.doe');
 */

class UsersModel {
  async loginModel(username) {
    const sql = `SELECT * FROM users WHERE username = ?`
    return await db.query(sql, [username]);
  }

  async userPermissions(id) {
    const sql = `
    SELECT p.permission
    FROM user_permissions AS up
    JOIN permissions AS p ON up.permission_id = p.id
    WHERE up.user_id = ?;
    `
    return await db.query(sql, [id]);
  }

  async verifyModel(username) {
    const sql = `SELECT * FROM users WHERE username = ? AND is_active = TRUE`
    return await db.query(sql, [username]);
  }

  async create({ name, last_name, username, roles, passwordHash }) {
    const sql = `
      INSERT INTO users (name, username, last_name, password_hash)
      VALUES (?, ?, ?, ?)
    `;
    const params = [name, username, last_name, passwordHash];
    const [result] = await db.query(sql, params);
    return result;
  }

  async addPermissionsToUser(userId, roles) {
    const sql = `
      INSERT INTO user_permissions (user_id, permission_id)
      VALUES (?, (SELECT id FROM permissions WHERE permission = ?))
    `;

    for (const role of roles) {
      console.log("Adding role to user:", role);
      console.log("SQL:", sql);
      await db.query(sql, [userId, role]);
    }
  }

  async updatePassword({ userId, newPasswordHash }) {
    const sql = `
      UPDATE users 
      SET password_hash = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [newPasswordHash, userId];
    const [result] = await db.query(sql, params);
    return result;
  }

  async getUserById(userId) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await db.query(sql, [userId]);
    return rows[0];
  }

  async delete(id) {
    const sql = `UPDATE users SET is_active = FALSE WHERE id = ? AND is_active = TRUE`;
    const [result] = await db.query(sql, [id]);
    return result;
  }


}

export const usersModel = new UsersModel();
