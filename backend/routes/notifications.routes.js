import { Router } from "express";
import { check, param } from "express-validator";
import {
    createNotification,
    getNotifications,
    getNotificationById,
    deleteNotification,
} from "../controllers/notifications.controller.js";

const router = Router()

router.post(
    "/",
    [
        check("product_id", "El ID del producto es obligatorio").isInt(),
        check("content", "El contenido de la notificación es obligatorio").notEmpty(),
    ],
    createNotification   
);

router.get("/", getNotifications);

router.get(
    "/:id",
    [param("id", "El ID de la notificación es obligatorio").isInt()],
    getNotificationById
);

router.delete(
    "/:id",
    [param("id", "El ID de la notificación es obligatorio").isInt()],
    deleteNotification
);


export default router
