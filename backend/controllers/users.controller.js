import { usersService } from "../services/users.service.js";
import jwt from 'jsonwebtoken'
import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { AppError } from "../utils/error.util.js";

/**
 * Users Controller
 * @module UsersController
 * @description This module defines the UserController class which handles HTTP requests related to user authentication and management.
 *              It interacts with the UsersService to perform operations such as user login, token verification,
 *              user creation, password updates, and user deletion.
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { usersController } from '../controllers/users.controller.js';
 * 
 * app.post('/users/login', usersController.postLogin);
 */

class UserController {
  constructor() {
    this.postLogin = catchAsync(this.postLogin.bind(this));
    this.postVerify = catchAsync(this.postVerify.bind(this));
    this.createUser = catchAsync(this.createUser.bind(this));
    this.updatePassword = catchAsync(this.updatePassword.bind(this));
    this.deleteUser = catchAsync(this.deleteUser.bind(this));
  }

  async postLogin(req, res) {
    const token = await usersService.login(req.body);
    res.json({ token })
  }

  async postVerify(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) throw new AppError("Token no proporcionado", 401);
    const user = await usersService.verify({ token });

    res.send(user);
  }

  async createUser(req, res) {
    const user = await usersService.createUser(req.body);
    return res.status(201).json({ ok: true, message: "Usuario creado", user });
  }

  async updatePassword(req, res) {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const result = await usersService.updatePassword({ userId, currentPassword, newPassword, confirmPassword });

    return res.status(200).json({ ok: true, message: result.message });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const result = await usersService.deleteUser({ id });
    return res.status(200).json({ ok: true, message: result.message });
  }

}

export const usersController = new UserController();
