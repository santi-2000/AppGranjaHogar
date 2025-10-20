import { AppError } from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return next(new AppError("Token no proporcionado", 401));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new AppError("Token inválido", 403));
      req.user = user;
      const userRoles = req.user.roles || [];
  
      const hasRole = userRoles.some(role => allowedRoles.includes(role));

      if (!hasRole) return next(new AppError("No tienes permisos suficientes", 403));

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