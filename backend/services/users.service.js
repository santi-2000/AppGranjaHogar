import bcrypt from "bcryptjs";
import { UsersModel } from "../models/users.model.js";
import { Password } from "../valueObjects/users/Password.js";

export const createUserService = async ({ name, last_name, username, password }) => {
  const cleanName = String(name ?? "").trim();
  const cleanLast = String(last_name ?? "").trim();
  const cleanUser = String(username ?? "").trim();

  if (!cleanName || cleanName.length < 2) {
    const e = new Error("name mínimo 2 caracteres");
    e.code = "BAD_INPUT";
    throw e;
  }
  if (!cleanLast || cleanLast.length < 2) {
    const e = new Error("last_name mínimo 2 caracteres");
    e.code = "BAD_INPUT";
    throw e;
  }

  const passVO = new Password(password);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(passVO.value, salt);

  const created = await UsersModel.create({
    name: cleanName,
    last_name: cleanLast,
    username: cleanUser,
    passwordHash
  });

  return created;
};

export const deleteUserService = async (id) => {
  const [result] = await UsersModel.delete(id);
  
  if (!result || !result.affectedRows) {
    const e = new Error("Usuario no encontrado o no se pudo eliminar");
    e.code = "NOT_FOUND";
    throw e;
  }
  
  return { message: "Usuario eliminado exitosamente" };
};

export const logoutUserService = async () => {
  return { message: "Sesión cerrada exitosamente" };
};
