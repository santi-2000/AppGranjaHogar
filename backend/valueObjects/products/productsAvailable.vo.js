export class ProductsAvailableVO {
  constructor({ id, name, perishable, unit_id }) {
    this.id = id;
    this.name = name;
    this.perishable = perishable;
    this.unit_id = unit_id;

    Object.freeze(this);
  }
}
