import { validationResult } from 'express-validator'
import { addNotificationService, getNotificationsService, getNotificationByIdService, } from '../services/notifications.service.js';
import { BadRequestError } from '../utils/error.util.js';

export const createNotification = async (req, res) => {
    try {
        let validResult = validationResult(req);
        if (validResult.errors.length > 0) throw new BadRequestError(validResult.formatWith(({ msg }) => msg).array().join(', '));

        const newNotification = await addNotificationService(req.body);
        res.status(201).json(newNotification);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const getNotifications = async (req, res) => {
    try {
        let validResult = validationResult(req);
        if (validResult.errors.length > 0) throw new BadRequestError(validResult.formatWith(({ msg }) => msg).array().join(', '));

        const notifications = await getNotificationsService();
        res.json(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las notificaciones.' });
    }

};

export const getNotificationById = async (req, res) => {
    try {
        let validResult = validationResult(req);
        if (validResult.errors.length > 0) throw new BadRequestError(validResult.formatWith(({ msg }) => msg).array().join(', '));

        const { id } = req.params;
        const notification = await getNotificationByIdService(id);
        res.json(notification);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

};

export const deleteNotification = async (req, res) => {
    try {
        let validResult = validationResult(req);
        if (validResult.errors.length > 0) throw new BadRequestError(validResult.formatWith(({ msg }) => msg).array().join(', '));

        const { id } = req.params;
        const result = await removeNotificationService(id);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

