import { Router } from "express";
import { check, param, body } from "express-validator";
import {
    getAllPermissions,
    getUserPermissions,
    updateUserPermissions
} from "../controllers/permissions.controller.js";

const router = Router();

router.get("/", getAllPermissions);

router.get("/user/:user_id", [
    param("user_id", "User ID debe ser un número").isNumeric()
], getUserPermissions);

router.put("/user/:user_id", [
    param("user_id", "User ID debe ser un número").isNumeric(),
    body("permission_ids", "Permission IDs debe ser un array")
        .isArray()
        .optional({ nullable: true }),
    body("permission_ids.*", "Cada Permission ID debe ser un número")
        .isNumeric()
        .optional()
], updateUserPermissions);

export default router;