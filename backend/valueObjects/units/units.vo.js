export class UnitsVO {
  constructor({ id, name }) {  
    this.id = id;
    this.name = name;

    Object.freeze(this);
  }
}
