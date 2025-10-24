import { Router } from "express";
import { body, check, param } from "express-validator";
import { notificationController } from "../controllers/notifications.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authMiddlewareLogged } from "../middlewares/auth.middleware.js";

const router = Router()

router.post(
    "/",
    [
        authMiddlewareLogged,
        body("content").notEmpty().withMessage("El contenido de la notificación no puede estar vacío"),
        body("type_id").isInt().withMessage("El ID del tipo de notificación debe ser un número entero"),
        validate
    ],
    notificationController.createNotification
);

router.get("/", authMiddlewareLogged, notificationController.getNotifications);

router.get(
    "/:id",
    [
        authMiddlewareLogged,
        param("id", "El ID de la notificación es obligatorio").notEmpty().isInt().withMessage("El ID de la notificación debe ser un número entero"),
        validate
    ],
    notificationController.getNotificationById
);

router.delete(
    "/:id",
    [
        authMiddlewareLogged,
        param("id", "El ID de la notificación es obligatorio").isInt().withMessage("El ID de la notificación debe ser un número entero"),
        validate
    ],
    notificationController.deleteNotification
);


export default router
