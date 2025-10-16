export class ProductEntryVO {
  constructor(entry) {
    this.product_id = parseInt(entry.product_id);
    this.user_id = parseInt(entry.user_id);
    this.unit_id = parseInt(entry.unit_id);
    this.is_donation = Boolean(entry.is_donation);
    this.quantity = parseFloat(entry.quantity);
    this.cost = this.is_donation ? null : parseFloat(entry.cost);
    this.exp_date = entry.exp_date ? new Date(entry.exp_date) : null;
    this.created_at = new Date();

    this.validate();
  }

  validate() {
    if (!this.product_id || !this.user_id || !this.unit_id)
      throw new Error("Faltan campos obligatorios (producto, usuario o unidad)");

    if (isNaN(this.quantity) || this.quantity <= 0)
      throw new Error("La cantidad debe ser un número positivo");

    if (this.is_donation && this.cost)
      throw new Error("No se debe incluir costo en una donación");

    if (!this.is_donation && (this.cost === null || isNaN(this.cost)))
      throw new Error("Debe incluir costo si no es una donación");

    if (this.exp_date && isNaN(this.exp_date.getTime()))
      throw new Error("Fecha de caducidad inválida");
  }
}