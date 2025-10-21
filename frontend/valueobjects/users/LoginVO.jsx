/**
 * @file LoginVO.jsx
 * @description This file defines the LoginVO (Value Object) class, which encapsulates user login data.
 *              It is used to ensure data integrity and consistency when handling user login information.
 * @module valueObjects/LoginVO
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { LoginVO } from '../valueObjects/LoginVO.jsx';
 * 
 * const loginData = new LoginVO({ username: 'john.doe', password: 'password123' });
 */

export class LoginVO {
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }
}