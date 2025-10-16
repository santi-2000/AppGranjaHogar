import { validationResult } from "express-validator";
import { createUserService, deleteUserService } from "../services/users.service.js";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
  
  try {

    const user = await createUserService(req.body);
    return res.status(201).json({ ok: true, message: "Usuario creado", user });

  } catch (err) {

    if (err.code === "BAD_INPUT") return res.status(400).json({ ok: false, message: err.message });
    
    console.error("createUser error:", err);
    return res.status(500).json({ ok: false, message: "Error interno del servidor" });

  }
};

export const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
  
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    return res.status(200).json({ ok: true, message: result.message });

  } catch (err) {
    if (err.code === "NOT_FOUND") return res.status(404).json({ ok: false, message: err.message });
    
    console.error("deleteUser error:", err);
    return res.status(500).json({ ok: false, message: "Error interno del servidor" });
  }
};
