import { Router } from "express";
import { param, body } from "express-validator";
import {
    getAllPermissions,
    getUserPermissions,
    updateUserPermissions
} from "../controllers/permissions.controller.js";

const router = Router();

router.get("/", getAllPermissions);

router.get("/user/:id", [
    param("id", "User ID debe ser un número").isNumeric()
], getUserPermissions);

router.put("/user/:id", [
    param("id", "User ID debe ser un número").isNumeric(),
    body("permission-ids", "Permission IDs debe ser un array")
        .exists().withMessage("Permission IDs es requerido")
        .isArray().withMessage("Permission IDs debe ser un array"),
    body("permission-ids.*", "Cada Permission ID debe ser un número")
        .isNumeric().withMessage("Cada Permission ID debe ser un número")
], updateUserPermissions);

export default router;
