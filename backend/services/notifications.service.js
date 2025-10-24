import NotificationVO from '../valueObjects/notifications/notification.vo.js';
import { notificationsModel } from '../models/notifications.model.js';
import { AppError } from '../utils/error.util.js';
import { convertPermissionsArrayByNameToId } from '../utils/permissions.util.js';

class NotificationService {
    async addNotification({ user_id, product_id, product_entry_id, product_out_id, content, type_id, permission_id }) {
        const id = await notificationsModel.createNotification({ user_id, product_id, product_entry_id, product_out_id, content, type_id, permission_id });

        return new NotificationVO(
            {
                id,
                user_id,
                content,
                type_id
            }
        );
    }
    async getNotifications(user) {
        const permissions = convertPermissionsArrayByNameToId(user.permissions);
        const rows = await notificationsModel.getAllNotifications(permissions);
        return rows.map(n => new NotificationVO(
            {
                id: n.id,
                user_id: n.user_id,
                content: n.content,
                type_id: n.type_id,
                user_username: n.user_username
            }
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