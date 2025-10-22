/**
 * @module models/users
 * @description This module provides methods for interacting with the 'users' table in the database.
 *              It includes functions for user authentication, creation, permission management,
 *              password updates, and user deletion.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Yahir Alfredo Tapia Sifuentes
 * @author Renata Soto Bravo
 * @author Renata Loaiza
 * 
 * @example
 * import { usersModel } from '../models/users.model.js';
 * const user = await usersModel.loginModel('john.doe');
 */
import db from "../models/index.js"


class UsersModel {
  /**
   * @author Jared Alejandro Marquez Muñoz Grado
   */
  async loginModel(username) {
    const sql = `SELECT * FROM users WHERE username = ?`
    return await db.query(sql, [username]);
  }

  /**
   * @author Yahir Alfredo Tapia Sifuentes
   */
  async userPermissions(id) {
    const sql = `
    SELECT p.permission
    FROM user_permissions AS up
    JOIN permissions AS p ON up.permission_id = p.id
    WHERE up.user_id = ?;
    `
    return await db.query(sql, [id]);
  }

  /**
   * @author Jared Alejandro Marquez Muñoz Grado
   */
  async verifyModel(username) {
    const sql = `SELECT * FROM users WHERE username = ? AND is_active = TRUE`
    return await db.query(sql, [username]);
  }

  async getAllUsers() {
    const sql = `SELECT * FROM users WHERE is_active = TRUE`;
    const [rows] = await db.query(sql);
    return rows;
  }

  /**
   * @author Renata Loaiza
   */
  async create({ name, lastName, username, passwordHash }) {
    const sql = `
      INSERT INTO users (name, username, last_name, password_hash)
      VALUES (?, ?, ?, ?)
    `;
    const params = [name, username, lastName, passwordHash];
    const [result] = await db.query(sql, params);
    return result;
  }

  async addPermissionsToUser(userId, permissions) {
    const sql = `
      INSERT INTO user_permissions (user_id, permission_id)
      VALUES (?, (SELECT id FROM permissions WHERE permission = ?))
    `;

    for (const permission of permissions) {
      await db.query(sql, [userId, permission]);
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
    const sql = `
    SELECT * 
    FROM users 
    WHERE id = ? 
    AND is_active = TRUE`;
    const [rows] = await db.query(sql, [userId]);
    return rows[0];
  }

  /**
   * @author Yahir Alfredo Tapia Sifuentes
   */
  async updateUser({ id, name, last_name }) {
    const sql = `
    UPDATE users 
    SET name = ?, last_name = ?
    WHERE id = ? AND is_active = TRUE
    `;
    const params = [name, last_name, id];
    const [result] = await db.query(sql, params);
    return result;
  }

  /**
   * @author Yahir Alfredo Tapia Sifuentes
   */
  async updateUserPermissions(userId, permissions) {
    const deleteSql = `DELETE FROM user_permissions WHERE user_id = ?`;
    await db.query(deleteSql, [userId]);

    const insertSql = `
      INSERT INTO user_permissions (user_id, permission_id)
      VALUES (?, (SELECT id FROM permissions WHERE permission = ?))
    `;

    for (const permission of permissions) {
      await db.query(insertSql, [userId, permission]);
    }
  }

  /**
   * @author Renata Soto Bravo
   */
  async delete(id) {
    const sql = `UPDATE users SET is_active = FALSE WHERE id = ? AND is_active = TRUE`;
    const [result] = await db.query(sql, [id]);
    return result;
  }
}

export const usersModel = new UsersModel();
