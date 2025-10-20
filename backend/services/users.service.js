import bcrypt from "bcryptjs";
import { usersModel } from "../models/users.model.js";
import { PasswordVO } from "../valueObjects/users/password.vo.js";
import { PasswordUpdateVO } from "../valueObjects/users/passwordUpdate.vo.js";
import { AppError } from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

export class UsersService {
  async login({ username, password }) {
    const [rowsUsername] = await usersModel.loginModel(username);
    if (rowsUsername.length === 0) throw new AppError("Datos Incorrectos");

    const validationPassword = await bcrypt.compare(password, rowsUsername[0].password_hash)
    if (!validationPassword) throw new AppError("Contraseña incorrecta");

    const userPermissions = await usersModel.userPermissions(rowsUsername[0].id);
    rowsUsername[0].permissions = userPermissions.map(p => p.permission);

    console.log("USER PERMISSIONS:", rowsUsername[0].permissions);
    
    const token = jwt.sign({
      id: rowsUsername[0].id,
      username: rowsUsername[0].username,
      name: rowsUsername[0].name,
      last_name: rowsUsername[0].last_name
    }, process.env.JWT_SECRET, { expiresIn: "365d" });

    return token;
  }

  async verify({ token }) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) throw new AppError("Token inválido", 401);
    return user
  }

  async createUser({ name, last_name, username, password }) {
    const passVO = new PasswordVO(password);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passVO.value, salt);

    const created = await usersModel.create({
      name,
      last_name,
      username,
      passwordHash
    });

    return created;
  };

  async updatePassword({ userId, currentPassword, newPassword, confirmPassword }) {
    const passwordUpdateVO = new PasswordUpdateVO({
      currentPassword,
      newPassword,
      confirmPassword
    });

    const user = await usersModel.getUserById(userId);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    

    const isCurrentPasswordValid = await bcrypt.compare(passwordUpdateVO.getCurrentPassword(), user.password_hash);
    if (!isCurrentPasswordValid) throw new AppError("La contraseña actual es incorrecta", 400);

    const newPassVO = new PasswordVO(passwordUpdateVO.getNewPassword());

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassVO.value, salt);


    const result = await usersModel.updatePassword({
      userId,
      newPasswordHash
    });

    if (!result.affectedRows) throw new AppError("No se pudo actualizar la contraseña", 500);

    return { success: true, message: "Contraseña actualizada exitosamente" };
  };

  async deleteUser({ id }) {
    const [result] = await usersModel.delete(id);

    if (!result || !result.affectedRows) throw new AppError("Usuario no encontrado o no se pudo eliminar", 404);

    return { message: "Usuario eliminado exitosamente" };
  };
}

export const usersService = new UsersService();