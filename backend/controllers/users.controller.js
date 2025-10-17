import { validationResult } from "express-validator";
import { createUserService, loginService, updatePasswordService, deleteUserService } from "../services/users.service.js";
import db from "../models/index.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const postLogin = async (req, res) => {
  try {
    console.log(req.body)
    if (req.session?.token) return res.status(400).json({ error: "Sesion YA Iniciada" })

    let result = validationResult(req);

    if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });

    await loginService(req);

    res.json("Sesión Iniciada")
  } catch (error) {
    console.log(error)
    res.status(500).send('Error iniciando sesión');
  }
}

export const postLogout = async (req, res) => {
  try {
    if (!req.session?.token) return res.status(400).json({ error: "Sesion NO Iniciada" })

    delete req.session.token;

    res.json("Sesión Cerrada")
  } catch (error) {
    console.log(error)
    res.status(500).json({ "Error": "Error" });
  }
}

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

export const updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

  try {
    const token = req.session?.token;
    if (!token) {
      return res.status(401).json({ ok: false, message: "No autorizado" });
    }

    const decoded = jwt.verify(token, process.env.SESSION_PASSWORD);
    const userId = decoded.id;

    const { currentPassword, newPassword, confirmPassword } = req.body;

    const result = await updatePasswordService({
      userId,
      currentPassword,
      newPassword,
      confirmPassword
    });

    return res.status(200).json({ ok: true, message: result.message });

  } catch (err) {
    if (err.message.includes("contraseña") || err.message.includes("Password")) {
      return res.status(400).json({ ok: false, message: err.message });
    }
    
    if (err.code === "USER_NOT_FOUND") {
      return res.status(404).json({ ok: false, message: err.message });
    }
    if (err.code === "INVALID_CURRENT_PASSWORD") {
      return res.status(400).json({ ok: false, message: err.message });
    }
    if (err.code === "UPDATE_FAILED") {
      return res.status(500).json({ ok: false, message: err.message });
    }

    console.error("updatePassword error:", err);
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



