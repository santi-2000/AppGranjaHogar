import { AppError } from "../utils/error.util.js";
import jwt from "jsonwebtoken";

/**
 * auth middleware
 * @module AuthMiddleware
 * @description This module provides authentication and authorization middleware functions.
 *              It includes `authAuthorizePermissions` for role-based access control
 *              and `authMiddlewareLogged` for general authentication.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { authAuthorizePermissions, authMiddlewareLogged } from '../middlewares/auth.middleware.js';
 * 
 * router.get('/admin', authAuthorizePermissions('admin'), adminController.getDashboard);
 * router.get('/profile', authMiddlewareLogged, userController.getProfile);
 */

/**
 * Middleware to authorize user permissions.
 * Checks if the user has any of the allowed permissions or is an admin.
 *
 * @param {...string} allowedPermissions - A list of permissions that are allowed to access the route.
 * @returns {Function} Express middleware.
 * @throws {AppError} 401 if no token is provided.
 * @throws {AppError} 403 if the token is invalid or the user does not have sufficient permissions.
 */

export const authAuthorizePermissions = (...allowedPermissions) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return next(new AppError("Token no proporcionado", 401));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new AppError("Token inválido", 403));
      req.user = user;
      
      const userPermissions = req.user.permissions || [];
      const allowedPermissionsIntegrated = [...allowedPermissions, "admin"];

      const hasPermission = userPermissions.some(permission => allowedPermissionsIntegrated.includes(permission));

      if (!hasPermission) return next(new AppError("No tienes permisos suficientes", 403));

      next();
    });

  };
}

export const authMiddlewareLogged = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return next(new AppError("Token no proporcionado", 401));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new AppError("Token inválido", 403));
    req.user = user;
    next();
  });
}