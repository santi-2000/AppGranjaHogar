export class ProductsAvailableVO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;

    Object.freeze(this);
  }
}
