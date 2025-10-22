/**
 * @class PasswordUpdateVO
 * @description This file defines the PasswordUpdateVO (Value Object) class, 
 * which encapsulates data related to updating a user's password.
 * @module valueObjects/passwordUpdate
 * @author Roberto Santiago Estrada Orozco
 * @example 
 * import { PasswordUpdateVO } from '../valueObjects/users/passwordUpdate.vo.js';
 * const passwordUpdateVO = new PasswordUpdateVO({
 */


export class PasswordUpdateVO {
  constructor({ currentPassword, newPassword, confirmPassword }) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
    
    Object.freeze(this);
  }

  getCurrentPassword() {
    return this.currentPassword;
  }

  getNewPassword() {
    return this.newPassword;
  }

  getConfirmPassword() {
    return this.confirmPassword;
  }
}
