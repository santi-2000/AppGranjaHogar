import { validationResult } from "express-validator";
import { createUserService } from "../services/users.service.js";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  try {
    const user = await createUserService(req.body);
    return res.status(201).json({ ok: true, message: "Usuario creado", user });
  } catch (err) {
    if (err.code === "BAD_INPUT") {
      return res.status(400).json({ ok: false, message: err.message });
    }
    console.error("createUser error:", err);
    return res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
