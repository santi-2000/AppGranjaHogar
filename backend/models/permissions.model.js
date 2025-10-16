import db from "./index.js"

export const getAllPermissionsModel = async () => {
    const [rows] = await db.query('SELECT * FROM permissions ORDER BY permission');
    return rows;
}

export const getUserPermissionsModel = async (user_id) => {
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

export const deleteUserPermissionsModel = async (user_id) => {
    return await db.query('DELETE FROM user_permissions WHERE user_id = ?', [user_id]);
}

export const insertUserPermissionsModel = async (user_id, permission_ids) => {
    if (permission_ids.length === 0) {
        return [{ affectedRows: 0 }];
    }
    const values = permission_ids.map(id => [user_id, id]);
    return await db.query('INSERT INTO user_permissions (user_id, permission_id) VALUES ?', [values]);
}