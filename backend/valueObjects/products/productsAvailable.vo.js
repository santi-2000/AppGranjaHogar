export class ProductsAvailableVO {
  constructor({ id, name, perishable }) {
    this.id = id;
    this.name = name;
    this.is_perishable = perishable;

    Object.freeze(this);
  }
}
