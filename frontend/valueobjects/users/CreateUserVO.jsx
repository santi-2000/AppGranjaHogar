export class CreateUserVO {
    constructor({ name, lastName, username, password, permissions }) {
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.permissions = permissions;
    }
}