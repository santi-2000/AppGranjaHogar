import db from "./index.js"

/**
 * Model class for handling permissions database operations.
 * @class PermissionsModel
 * @description This model manages all database operations related to permissions including
 * fetching all permissions, retrieving user-specific permissions, and managing user-permission
 * relationships through insert and delete operations.
 * 
 * @author Amada Leticia García Cázares
 */
class PermissionsModel {
    /**
     * Retrieves all permissions from the database ordered by permission name.
     * @async
     * @method getAllPermissions
     * @returns {Promise<Array>} A promise that resolves to an array of permission objects from the database.

     */
    async getAllPermissions() {
        const [rows] = await db.query('SELECT * FROM permissions ORDER BY permission');
        return rows;
    }

    /**
     * Retrieves permissions assigned to a specific user.
     * @async
     * @method getUserPermissions
     * @param {string|number} user_id - The ID of the user whose permissions to fetch.
     * @returns {Promise<Array>} A promise that resolves to an array of permission objects assigned to the user.
     */
    async getUserPermissions(user_id) {
        const sql = `
            SELECT p.id, p.permission 
            FROM permissions p
            INNER JOIN user_permissions up ON p.id = up.permission_id
            WHERE up.user_id = ?
            ORDER BY p.permission
        `;
        const [rows] = await db.query(sql, [user_id]);
        return rows;
    }

    /**
     * Removes all permissions assigned to a specific user.
     * @async
     * @method deleteUserPermissions
     * @param {string|number} user_id - The ID of the user whose permissions to remove.
     * @returns {Promise<Array>} A promise that resolves to the database query result.
     */
    async deleteUserPermissions(user_id) {
        return await db.query('DELETE FROM user_permissions WHERE user_id = ?', [user_id]);
    }
    
    /**
     * Assigns multiple permissions to a specific user.
     * @async
     * @method insertUserPermissions
     * @param {string|number} user_id - The ID of the user to assign permissions to.
     * @param {Array<number>} permission_ids - Array of permission IDs to assign to the user.
     * @returns {Promise<Array>} A promise that resolves to the database query result.
     */
    async insertUserPermissions(user_id, permission_ids) {
        if (permission_ids.length === 0) {
            return [{ affectedRows: 0 }];
        }
        const values = permission_ids.map(id => [user_id, id]);
        return await db.query('INSERT INTO user_permissions (user_id, permission_id) VALUES ?', [values]);
    }

}

export const permissionsModel = new PermissionsModel();