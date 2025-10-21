import bcrypt from "bcryptjs";
import { usersModel } from "../models/users.model.js";
import { PasswordVO } from "../valueObjects/users/password.vo.js";
import { PasswordUpdateVO } from "../valueObjects/users/passwordUpdate.vo.js";
import { AppError } from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

/**
 * Users Service
 * @module UsersService
 * @description This module provides services for user-related operations, including authentication,
 *              token verification, user creation, password updates, and user deletion.
 *              It interacts with the UsersModel to perform database operations and uses
 *              bcrypt for password hashing and jsonwebtoken for token management.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { usersService } from '../services/users.service.js';
 * 
 * const token = await usersService.login('john.doe', 'password123');
 */

export class UsersService {
  async login({ username, password }) {
    const [rowsUsername] = await usersModel.loginModel(username);
    if (rowsUsername.length === 0) throw new AppError("Datos Incorrectos");

    const validationPassword = await bcrypt.compare(password, rowsUsername[0].password_hash)
    if (!validationPassword) throw new AppError("Contraseña incorrecta");

    const [userPermissions] = await usersModel.userPermissions(rowsUsername[0].id);
    const permissions = userPermissions.map(r => r.permission);

    const token = jwt.sign({
      id: rowsUsername[0].id,
      username: rowsUsername[0].username,
      name: rowsUsername[0].name,
      permissions: permissions,
      last_name: rowsUsername[0].last_name
    }, process.env.JWT_SECRET, { expiresIn: "365d" });

    return token;
  }

  async verify({ token }) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) throw new AppError("Token inválido", 401);
    return user
  }

  async createUser({ name, last_name, username, password, roles }) {
    const passVO = new PasswordVO(password);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passVO.value, salt);

    const created = await usersModel.create({
      name,
      last_name,
      username,
      roles,
      passwordHash
    });

    await usersModel.addPermissionsToUser(created.insertId, roles);

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