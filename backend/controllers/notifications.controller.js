import { notificationService } from '../services/notifications.service.js';
import { catchAsync } from "../middlewares/catchAsync.middleware.js";

export class NotificationController {
    constructor() {
        this.createNotification = catchAsync(this.createNotification.bind(this));
        this.getNotifications = catchAsync(this.getNotifications.bind(this));
        this.getNotificationById = catchAsync(this.getNotificationById.bind(this));
    }

    async createNotification(req, res) {
        const newNotification = await  notificationService.addNotification(req.body);
        res.status(201).json(newNotification);
    };

    async getNotifications(req, res) {
        const notifications = await notificationService.getNotifications();
        res.json(notifications);

    };

    async getNotificationById(req, res) {
        const { id } = req.params;
        const notification = await notificationService.getNotificationById(id);
        res.json(notification);

    };

    async deleteNotification(req, res) {
        const { id } = req.params;
        const result = await notificationService.removeNotification(id);
        res.json(result);
    };

}

export const notificationController = new NotificationController();