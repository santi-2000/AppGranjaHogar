import db from "./index.js";

class NotificationsModel {
    async createNotification(data) {
        const { user_id, product_id, product_entry_id, product_out_id, content, type_id, permission_id } = data;
        const [result] = await db.query(
            'INSERT INTO notifications (user_id, product_id, product_entry_id, product_out_id, content, type_id, permission_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());',
            [user_id, product_id, product_entry_id, product_out_id, content, type_id, permission_id]
        );
        return result.insertId;
    }

    async getAllNotifications(permissions) {

        const sql = `
            SELECT n.* , p.name AS product_name, u.username AS user_username
            FROM notifications n LEFT JOIN products p on n.product_id = p.id
            LEFT JOIN users u on n.user_id = u.id
            WHERE n.permission_id IN (?)
            AND n.created_at BETWEEN NOW() - INTERVAL 14 DAY AND NOW()
            ORDER BY n.created_at DESC;
        `;
        const [rows] = await db.query(sql, [permissions]);
        return rows;
    }

    async getNotificationById(id) {
        const [rows] = await db.query(
            'SELECT * FROM notifications WHERE id = ?;', [id]
        );
        return rows[0];
    }

    async deleteNotificationById(id) {
        const [result] = await db.query(
            'DELETE FROM notifications WHERE id = ?;', [id]
        );
        return result.affectedRows;
    }
}

export const notificationsModel = new NotificationsModel();