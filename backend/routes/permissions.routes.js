import { Router } from "express";
import { param, body } from "express-validator";
import { permissionsController } from "../controllers/permissions.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddlewareLogged, permissionsController.getAllPermissions);

router.get("/user/:id", [
    authAuthorizePermissions("manage-users"),
    param("id", "User ID debe ser un número").notEmpty().isInt(),
    validate
], permissionsController.getUserPermissions);

router.put("/user/:id", [
    authAuthorizePermissions("manage-users"),
    param("id", "User ID debe ser un número").notEmpty().isInt(),
    body("permission-ids", "Permission IDs debe ser un array")
        .exists().notEmpty().withMessage("Permission IDs es requerido")
        .isArray().withMessage("Permission IDs debe ser un array"),
    body("permission-ids.*", "Cada Permission ID debe ser un número")
        .notEmpty().isInt().withMessage("Cada Permission ID debe ser un número"),
    validate
], permissionsController.updateUserPermissions);

export default router;
