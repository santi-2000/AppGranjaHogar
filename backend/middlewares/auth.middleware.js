import { AppError } from "../utils/error.util.js";
import jwt from "jsonwebtoken";

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