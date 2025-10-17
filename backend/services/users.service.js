import bcrypt from "bcryptjs";
import { loginModel, UsersModel } from "../models/users.model.js";
import { Password } from "../valueObjects/users/Password.js";
import { PasswordUpdate } from "../valueObjects/users/PasswordUpdate.js";
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

export const updatePasswordService = async ({ userId, currentPassword, newPassword, confirmPassword }) => {
  const passwordUpdateVO = new PasswordUpdate({
    currentPassword,
    newPassword,
    confirmPassword
  });

  const user = await UsersModel.getUserById(userId);
  if (!user) {
    throw Object.assign(new Error("Usuario no encontrado"), { code: "USER_NOT_FOUND" });
  }

  const isCurrentPasswordValid = await bcrypt.compare(passwordUpdateVO.getCurrentPassword(), user.password_hash);
  if (!isCurrentPasswordValid) {
    throw Object.assign(new Error("La contraseña actual es incorrecta"), { code: "INVALID_CURRENT_PASSWORD" });
  }

  const newPassVO = new Password(passwordUpdateVO.getNewPassword());
  
  const salt = await bcrypt.genSalt(10);
  const newPasswordHash = await bcrypt.hash(newPassVO.value, salt);

  
  const result = await UsersModel.updatePassword({
    userId,
    newPasswordHash
  });

  if (!result.affectedRows) {
    throw Object.assign(new Error("No se pudo actualizar la contraseña"), { code: "UPDATE_FAILED" });
  }

  return { success: true, message: "Contraseña actualizada exitosamente" };
};
