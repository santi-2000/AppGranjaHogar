const notificationService = require('../services/notification.service');

const createNotification = async (req, res) => {
    try {
        const newNotification = await notificationService.addNotification(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notificaciones.' });
    }

};

const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationService.getNotificationById(id);
        res.json(notification);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await notificationService.removeNotification(id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    getNotificationById,
    deleteNotification
};