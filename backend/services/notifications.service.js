import NotificationVO from '../valueObjects/notification.vo.js';
import { createNotificationModel, getAllNotificationsModel, getNotificationByIdModel, deleteNotificationByIdModel } from '../models/notifications.model.js';

export const addNotificationService = async (data) => {
    const id = await createNotificationModel(data);
    return new NotificationVO(
        id,
        data.product_id,
        data.product_entry_id,
        data.content,
        data.notification_type,
        new Date()
    );
};

export const getNotificationsService = async () => {
    const rows = await getAllNotificationsModel();
    return data.map(n => new NotificationVO(
        n.id,
        n.product_id,
        n.product_entry_id,
        n.content,
        n.notification_type,
        n.created_at
    
    ));
};

export const getNotificationByIdService = async (id) => {
    const row = await getNotificationByIdModel(id);
    if (!row) throw new Error('Notificación no encontrada.');
    return new NotificationVO(row.id, row.product_id, row.product_entry_id, row.content, row.notification_type, row.created_at);
};

export const removeNotificationService = async (id) => {
    const affectedRows = await deleteNotificationModel(id);
    if (!affected) throw new Error('Notificación no encontrada o ya eliminada.');
    return { message: 'Notificación eliminada exitosamente.' };
};

