export class ProductOutVO {
  constructor({ id, user_id, product_id, reason_id, department_id, unit_id, quantity, notes }) {
    if (!user_id || !product_id || !reason_id || !department_id || !unit_id)
      throw new Error("Faltan campos obligatorios.");

    if (quantity <= 0) throw new Error("La cantidad debe ser mayor a cero.");
    this.id = id || null;
    this.user_id = user_id;
    this.product_id = product_id;
    this.reason_id = reason_id;
    this.department_id = department_id;
    this.unit_id = unit_id;
    this.quantity = quantity;
    this.notes = notes || null;
  }
}
