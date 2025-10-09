export class Password {
  constructor(value) {
    if (!value || typeof value !== "string" || value.length < 8) {
      throw new Error("Password debe tener al menos 8 caracteres");
    }
    this.value = value;
  }
  toString() { return this.value; }
}
