import { Router } from "express";
import { param, body } from "express-validator";
import { permissionsController } from "../controllers/permissions.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js";

/**
 * Express router for handling permissions-related API endpoints.
 * @module routes/permissions.routes
 * @description This router defines all permissions-related API routes including fetching all permissions,
 * retrieving user-specific permissions, and updating user permissions. All routes include appropriate
 * authentication and authorization middleware, as well as input validation.
 * 
 * @author Amada Leticia García Cázares
 */
const router = Router();

/**
 * Route to fetch all available permissions.
 * @route GET /
 * @middleware authMiddlewareLogged - Requires user to be logged in
 * @returns {Array} Array of permission objects
 */
router.get("/", authMiddlewareLogged, permissionsController.getAllPermissions);

/**
 * Route to fetch permissions for a specific user.
 * @route GET /user/:id
 * @middleware authAuthorizePermissions("manage-users") - Requires manage-users permission
 * @middleware param validation - Validates user ID parameter
 * @param {number} id - User ID (must be an integer)
 * @returns {Object} User permission object with permissions array and count
 */
router.get("/user/:id", [
    authAuthorizePermissions("manage-users"),
    param("id", "User ID debe ser un número").notEmpty().isInt(),
    validate
], permissionsController.getUserPermissions);

/**
 * Route to update permissions for a specific user.
 * @route PUT /user/:id
 * @middleware authAuthorizePermissions("manage-users") - Requires manage-users permission
 * @middleware param validation - Validates user ID parameter
 * @middleware body validation - Validates permission IDs array
 * @param {number} id - User ID (must be an integer)
 * @param {Array<number>} permission-ids - Array of permission IDs to assign to the user
 * @returns {Object} Success response with message
 */
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
