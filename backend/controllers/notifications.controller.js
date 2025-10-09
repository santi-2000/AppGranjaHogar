import { addNotificationService, getNotificationsService, getNotificationByIdService,  } from '../services/notifications.service.js';

export const createNotification = async (req, res) => {
    try {
        const newNotification = await addNotificationService(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getNotifications = async (req, res) => {
    try {
        const notifications = await getNotificationsService();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notificaciones.' });
    }

};

export const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await getNotificationByIdService(id);
        res.json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await removeNotificationService(id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

