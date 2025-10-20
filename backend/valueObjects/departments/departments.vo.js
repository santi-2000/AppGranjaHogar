export class DepartmentsVO {
  constructor({
    id,
    name
  }) {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error("id inválido")
    }
    if (typeof name !== 'string') {
      throw new Error("nombre inválido")
    }
    
    this.id = id;
    this.name = name;
  }
}
