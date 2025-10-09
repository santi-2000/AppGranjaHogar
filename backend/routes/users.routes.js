import { Router } from "express";
import { body } from "express-validator";
import { createUser } from "../controllers/users.controller.js";

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

export default router;
