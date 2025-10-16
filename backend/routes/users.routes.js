import { Router } from "express";
import { body,check } from "express-validator";
import { createUser, postLogin, postLogout, updatePassword } from "../controllers/users.controller.js";

const router = Router();

router.post("/login",[
    check("username").isLength().withMessage("El username no es válido"),
    check("password").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    check("username").notEmpty().withMessage("El username es requerido"),
    check("password").notEmpty().withMessage("La contraseña es requerida"),

], postLogin)

router.post("/logout", postLogout)

router.post(
  "/nuevo",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("name mínimo 2 caracteres"),
    body("last_name").trim().isLength({ min: 2 }).withMessage("last_name mínimo 2 caracteres"),
    body("username").trim().isLength({ min: 3 }).withMessage("username mínimo 3 caracteres"),
    body("password").isString().isLength({ min: 8 }).withMessage("password mínimo 8 caracteres")
  ],
  createUser
);

router.put(
  "/update-password",
  [
    body("currentPassword").isString().notEmpty().withMessage("La contraseña actual es requerida"),
    body("newPassword").isString().isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres"),
    body("confirmPassword").isString().notEmpty().withMessage("La confirmación de contraseña es requerida")
  ],
  updatePassword
);

export default router;
