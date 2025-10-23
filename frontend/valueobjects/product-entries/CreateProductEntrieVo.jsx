export class CreateProductEntrieVo {
  constructor({
    product_id,
    quantity,
    unit_id,
    exp_date,
    is_donation,
    cost,
  }) {
    this.product_id = product_id;
    this.unit_id = unit_id;
    this.quantity = quantity;
    this.is_donation = is_donation;
    this.exp_date = exp_date;
    this.cost = cost;
  }
}