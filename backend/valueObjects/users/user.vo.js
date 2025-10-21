/**
 * @file user.vo.js
 * @description This file defines the UserVO (Value Object) class, which encapsulates user data.
 *              It is used to ensure data integrity and consistency when handling user-related information.
 * @module valueObjects/user
 * 
 * @author Jared Alejandro Marquez Muñoz Grado
 * 
 * @example
 * import { UserVO } from '../valueObjects/user.vo.js';
 * 
 * const user = new UserVO({ username: 'john.doe', password: 'password123' });
 */

export class UserVO { 
    
  constructor({ username, password }) {
    this.username = username;
    this.password = password;

    Object.freeze(this);
  }
}