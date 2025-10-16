export class ProductOutVO {
  constructor({
    id,
    user_id,
    product_id,
    reason_id,
    department_id,
    unit_id,
    quantity,
    notes,
    created_at
  }) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.reason_id = reason_id;
    this.department_id = department_id;
    this.unit_id = unit_id;
    this.quantity = quantity;
    this.notes = notes || null;
    this.created_at = created_at ? new Date(created_at).toLocaleString() : null;
  }
}
