import bcrypt from "bcryptjs";
import { loginModel, UsersModel } from "../models/users.model.js";
import { Password } from "../valueObjects/users/Password.js";
import { BadRequestError } from "../utils/error.util.js";
import jwt from 'jsonwebtoken'


export const loginService = async (req) => {
  const [rowsUsername] = await loginModel(req.body.username);
    if (rowsUsername.length === 0) throw new BadRequestError("Datos Incorrectos");

    const validationPassword = await bcrypt.compare(req.body.password, rowsUsername[0].password_hash)
    if (!validationPassword) throw new BadRequestError("Contraseña incorrecta");

    const token = jwt.sign({ id: rowsUsername[0].id }, process.env.SESSION_PASSWORD, { expiresIn: "365d" });
    req.session.token = token;
}

export const createUserService = async ({ name, last_name, username, password }) => {
  const cleanName = String(name ?? "").trim();
  const cleanLast = String(last_name ?? "").trim();
  const cleanUser = String(username ?? "").trim();

  if (!cleanName || cleanName.length < 2) throw Object.assign(new Error("name mínimo 2 caracteres"), { code: "BAD_INPUT" });
  if (!cleanLast || cleanLast.length < 2) throw Object.assign(new Error("last_name mínimo 2 caracteres"), { code: "BAD_INPUT" });
  if (!cleanUser || cleanUser.length < 3) throw Object.assign(new Error("username mínimo 3 caracteres"), { code: "BAD_INPUT" });

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
