export class ProductEntryVO {
  constructor(entry) {
    this.product_id = parseInt(entry.product_id);
    this.user_id = parseInt(entry.user_id);
    this.unit_id = parseInt(entry.unit_id);
    this.is_donation = Boolean(entry.is_donation);
    this.quantity = parseFloat(entry.quantity);
    this.cost = this.is_donation ? null : parseFloat(entry.cost);
    this.exp_date = entry.exp_date ? new Date(entry.exp_date) : null;

    Object.freeze(this);
  }
}