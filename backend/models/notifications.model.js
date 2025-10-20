import db from "./index.js";

class NotificationsModel {
    async createNotification(data) {
        const { product_id, product_entry_id, content, notification_type } = data;
        const [result] = await db.query(
            'INSERT INTO notifications (product_id, product_entry_id, content, notification_type, created_at) VALUES (?, ?, ?, ?, NOW());',
            [product_id, product_entry_id, content, notification_type]
        );
        return result.insertId;
    }

    async getAllNotifications() {
        const [rows] = await db.query(
            'SELECT n.* , p.name AS product_name FROM notifications n LEFT JOIN products p on n.product_id = p.id ORDER BY n.created_at DESC;'
        );
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