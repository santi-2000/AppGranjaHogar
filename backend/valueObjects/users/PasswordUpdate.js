export class PasswordUpdate {
  constructor({ currentPassword, newPassword, confirmPassword }) {
    this.validateInputs(currentPassword, newPassword, confirmPassword);
    
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
    
    Object.freeze(this);
  }

  validateInputs(currentPassword, newPassword, confirmPassword) {
    // Validar que todos los campos estén presentes
    if (!currentPassword || typeof currentPassword !== "string") {
      throw new Error("La contraseña actual es requerida");
    }

    if (!newPassword || typeof newPassword !== "string") {
      throw new Error("La nueva contraseña es requerida");
    }

    if (!confirmPassword || typeof confirmPassword !== "string") {
      throw new Error("La confirmación de contraseña es requerida");
    }

    // Validar longitud mínima
    if (newPassword.length < 8) {
      throw new Error("La nueva contraseña debe tener al menos 8 caracteres");
    }

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      throw new Error("Las contraseñas nuevas no coinciden");
    }

    // Validar que la nueva contraseña sea diferente a la actual
    if (currentPassword === newPassword) {
      throw new Error("La nueva contraseña debe ser diferente a la actual");
    }
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
