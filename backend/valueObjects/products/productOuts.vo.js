/**
 * @module valueObjects/products/productOuts
 * @description
 * This class defines the Product Out Value Object and 
 * ensures immutability and enforces the structure and formatting
 * of product out records when they are passed to 'productOuts.controller'.
 * It also specifically formats the 'created_at' date field for presentation.
 * @class
 */
export class ProductOutVO {
  /**
   * Creates an instance of ProductOutVO and freezes the object to ensure immutability.
   * @constructor
   * @param {Object} data - The raw data obtained from 'productOuts.model'.
   * @example
   * const record = { user_id: 1, product_id: 15, reason_id: 3, department_id: 2, unit_id: 4, quantity: 10, notes: "Donativo a otra granja hogar."};
   * const record = new ProductOutVO(record);
   */
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

    Object.freeze(this);
  }
}