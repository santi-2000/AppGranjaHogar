export class EditUserVO {
    constructor({ id, name, lastName, permissions }) {
        this.id = id
        this.name = name;
        this.lastName = lastName;
        this.permissions = permissions;
    }
}