import { Router } from "express";
import { body, check, param } from "express-validator";
import { usersController } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js";
import { AppError } from "../utils/error.util.js";

/**
 * @file users.routes.js
 * @description This file defines the routes for user-related operations in the application.
 * It includes routes for user login, token verification, user creation, password updates, and user deletion.
 * Each route is protected by authentication and authorization middleware to ensure that only authorized users can access them.
 * Input validation is performed using express-validator to ensure data integrity.
 * @module routes/users
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * import usersRoutes from './routes/users.routes.js';
 * app.use('/api/users', usersRoutes);
 */


const router = Router();

/**
 * @author Jared Alejandro Marquez Muñoz Grado
 */
router.post("/login", [
  body("username").isLength().withMessage("El username no es válido").notEmpty().withMessage("El username es requerido").trim().escape().toLowerCase(),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres").notEmpty().withMessage("La contraseña es requerida"),
  validate
],
  usersController.postLogin
)

/**
 * @author Jared Alejandro Marquez Muñoz Grado
 */
router.post("/verify",
  usersController.postVerify
)

/**
 * @author Yahir Alfredo Tapia Sifuentes
 */
router.get("/", authAuthorizePermissions("manage-users"), usersController.getUsers);

router.get("/:id", [
  authAuthorizePermissions("manage-users"),
  param("id").isInt().withMessage("ID debe ser un número entero"),
  validate
], usersController.getUserById);

router.post(
  "/new",
  [
    authAuthorizePermissions("manage-users"),
    body("name").trim().isLength({ min: 2 }).withMessage("name mínimo 2 caracteres").trim().escape().toLowerCase(),
    body("last_name").trim().isLength({ min: 2 }).withMessage("last_name mínimo 2 caracteres").trim().escape().toLowerCase(),
    body("username").trim().isLength({ min: 3 }).withMessage("username mínimo 3 caracteres").trim().escape().toLowerCase(),
    body("password").isString().isLength({ min: 8 }).withMessage("password mínimo 8 caracteres"),
    body("roles").isArray().withMessage("roles debe ser un array").custom((value) => {
      const validRoles = ["products-entries", "products-outs", "generate-reports", "edit-catalog", "manage-users"];
      if (!value.every(role => validRoles.includes(role)))
        throw new AppError(`Los roles deben ser uno de los siguientes: ${validRoles.join(", ")}`, 400);
      return true;
    }),
    validate
  ],
  usersController.createUser
);

/**
 * @author Yahir Alfredo Tapia Sifuentes
 */
router.put("/:id", [
  authAuthorizePermissions("manage-users"),
  param("id").isInt().withMessage("ID debe ser un número entero"),
  body("name").trim().isLength({ min: 2 }).withMessage("name mínimo 2 caracteres").trim().escape().toLowerCase(),
  body("lastName").trim().isLength({ min: 2 }).withMessage("last_name mínimo 2 caracteres").trim().escape().toLowerCase(),
  body("permissions").isArray().withMessage("permissions debe ser un array").custom((value) => {
    const validPermissions = ["products-entries", "products-outs", "generate-reports", "edit-catalog", "manage-users"];
    if (!value.every(permission => validPermissions.includes(permission)))
      throw new AppError(`Los permisos deben ser uno de los siguientes: ${validPermissions.join(", ")}`, 400);
    return true;
  }),
  validate
],
  usersController.putUser
);

router.put("/update-password", [
  authMiddlewareLogged,
  body("currentPassword").isString().notEmpty().withMessage("La contraseña actual es requerida"),
  body("newPassword").isString().isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
  body("confirmPassword").isString().notEmpty().withMessage("La confirmación de contraseña es requerida"),
  validate
],
  usersController.updatePassword
);

router.delete(
  "/:id",
  [
    authAuthorizePermissions("manage-users"),
    param("id").isInt().withMessage("ID debe ser un número entero"),
    validate
  ],
  usersController.deleteUser
);
export default router;
