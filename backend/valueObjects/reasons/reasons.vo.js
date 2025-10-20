export class ReasonsVO {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    
    Object.freeze(this);
  }
}
