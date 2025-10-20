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
