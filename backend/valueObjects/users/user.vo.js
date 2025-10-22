/**
 * @class UserVO
 * @description This file defines the UserVO (Value Object) class, which encapsulates user data.
 *              It is used to ensure data integrity and consistency when handling user-related information.
 * @module valueObjects/user
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * import { UserVO } from '../valueObjects/users/user.vo.js';
 * const userVO = new UserVO(userData);
 */

export class UserVO { 
    
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.lastName = data.last_name;
    this.username = data.username;
    this.permissions = data.permissions || [];

    Object.freeze(this);
  }
}