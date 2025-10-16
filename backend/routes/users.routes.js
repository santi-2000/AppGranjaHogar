import { Router } from "express";
import { body, param } from "express-validator";
import { createUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("name mínimo 2 caracteres"),
    body("last_name").trim().isLength({ min: 2 }).withMessage("last_name mínimo 2 caracteres"),
    body("password").isString().isLength({ min: 8 }).withMessage("password mínimo 8 caracteres")
  ],
  createUser
);

router.delete(
  "/:id",
  [
    param("id").isInt().withMessage("ID debe ser un número entero")
  ],
  deleteUser
);
export default router;
