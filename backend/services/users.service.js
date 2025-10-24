/**
 * @module services/users
 * @description This module provides services for user-related operations, including authentication,
 *              token verification, user creation, password updates, and user deletion.
 *              It interacts with the UsersModel to perform database operations and uses
 *              bcrypt for password hashing and jsonwebtoken for token management.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * @author Roberto Santiago Estrada Orozco
 * @author Renata Soto Bravo
 * @author Renata Loaiza
 * 
 * @example
 * import { usersService } from '../services/users.service.js';
 * const token = await usersService.login('john.doe', 'password123');
 */

import bcrypt from "bcryptjs";
import { usersModel } from "../models/users.model.js";
import { PasswordVO } from "../valueObjects/users/password.vo.js";
import { PasswordUpdateVO } from "../valueObjects/users/passwordUpdate.vo.js";
import { AppError } from "../utils/error.util.js";
import jwt from 'jsonwebtoken'
import { UserVO } from "../valueObjects/users/user.vo.js";
import { notificationService } from "./notifications.service.js";


export class UsersService {
  /**
   * @author Jared Alejandro Marquez Muñoz Grado
   */
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
      lastName: rowsUsername[0].last_name
    }, process.env.JWT_SECRET, { expiresIn: "365d" });

    return token;
  }

  /**
   * @author Jared Alejandro Marquez Muñoz Grado
   */
  async verify({ token }) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user
    } catch (error) {
      return false
    }
  }

  async getUsers() {
    const users = await usersModel.getAllUsers();
    return users.map(user => new UserVO(user));
  }

  /**
   * @author Yahir Alfredo Tapia Sifuentes
   */
  async getUserById({ id }) {
    const user = await usersModel.getUserById(id);
    const permissions = await usersModel.userPermissions(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    return new UserVO({
      ...user, permissions: permissions[0].map(p => p.permission)
    });
  }

  /**
   * @author Renata Loaiza
   */
  async createUser({ name, lastName, username, password, permissions, user_id }) {
    const passVO = new PasswordVO(password);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passVO.value, salt);

    const created = await usersModel.create({
      name,
      lastName,
      username,
      passwordHash
    });

    await usersModel.addPermissionsToUser(created.insertId, permissions);

    await notificationService.addNotification({
      user_id: user_id,
      content: `Se ha creado un nuevo usuario: ${username}`,
      type_id: 9,
      permission_id: 6
    });

    return created;
  };

  /**
   * @author Roberto Santiago Estrada Orozco
   */
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

  /**
   * @author Yahir Alfredo Tapia Sifuentes
   */
  async editUser({ id, name, lastName, permissions, user_id }) {
    console.log("Editing user:", id, name, lastName, permissions);
    const user = await usersModel.getUserById(id);
    if (!user) throw new AppError("Usuario no encontrado", 404);

    const updatedUser = await usersModel.updateUser({ id, name, last_name: lastName });

    await usersModel.updateUserPermissions(id, permissions);

    await notificationService.addNotification({
      user_id: user_id,
      content: `Se ha editado un usuario: ${name}`,
      type_id: 10,
      permission_id: 6
    });


    return new UserVO({
      ...updatedUser,
      permissions
    });
  }

  /**
   * @author Renata Soto Bravo
   */
  async deleteUser({ id, user_id }) {
    const [result] = await usersModel.delete(id);
    console.log(result);

    if (!result || !result.affectedRows) throw new AppError("Usuario no encontrado o no se pudo eliminar", 404);

    await notificationService.addNotification({
      user_id: user_id,
      content: `Se ha eliminado el usuario: ${id}`,
      type_id: 10,
      permission_id: 6
    });

    return { message: "Usuario eliminado exitosamente" };
  };
}

export const usersService = new UsersService();