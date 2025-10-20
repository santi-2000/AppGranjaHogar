import NotificationVO from '../valueObjects/notifications/notification.vo.js';
import { notificationsModel } from '../models/notifications.model.js';
import { AppError } from '../utils/error.util.js';

class NotificationService {
    async addNotification(data) {
        const id = await notificationsModel.createNotification(data);
        return new NotificationVO(
            id,
            data.product_id,
            data.product_entry_id,
            data.content,
            data.notification_type,
            new Date()
        );
    }
    async getNotifications() {
        const rows = await notificationsModel.getAllNotifications();
        return rows.map(n => new NotificationVO(
            n.id,
            n.product_id,
            n.product_entry_id,
            n.content,
            n.notification_type,
            n.created_at

        ));
    }
    async getNotificationById(id) {
        const row = await notificationsModel.getNotificationById(id);
        if (!row) throw new AppError('Notificación no encontrada.', 404);

        return new NotificationVO(row.id, row.product_id, row.product_entry_id, row.content, row.notification_type, row.created_at);
    }
    async removeNotification(id) {
        const affectedRows = await deleteNotificationByIdModel(id);
        if (!affectedRows) throw new AppError('Notificación no encontrada o ya eliminada.', 404);
        
        return { message: 'Notificación eliminada exitosamente.' };
    }
}

export const notificationService = new NotificationService();