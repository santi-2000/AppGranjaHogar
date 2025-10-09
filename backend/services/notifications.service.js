const NotificationVO = require('../valueObjects/notifications.vo');
const notificationsModel = require('../models/notifications.model');

const addNotification = async (data) => {
    const id = await notificationsModel.createNotification(data);
    return new NotificationVO(
        id,
        data.product_id,
        data.product_entry_id,
        data.content,
        data.notification_type,
        new Date()
    );
};

const getNotifications = async () => {
    const rows = await notificationModel.getAllNotifications();
    return data.map(n => new NotificationVO(
        n.id,
        n.product_id,
        n.product_entry_id,
        n.content,
        n.notification_type,
        n.created_at
    
    ));
};

const getNotificationById = async (id) => {
    const row = await notificationsModel.getNotificationById(id);
    if (!row) throw new Error('Notificación no encontrada.');
    return new NotificationVO(row.id, row.product_id, row.product_entry_id, row.content, row.notification_type, row.created_at);
};

const removeNotification = async (id) => {
    const affectedRows = await notificationsModel.deleteNotification(id);
    if (!affected) throw new Error('Notificación no encontrada o ya eliminada.');
    return { message: 'Notificación eliminada exitosamente.' };
};

module.exports = {
    addNotification,
    getNotifications,
    getNotificationById,
    removeNotification
};