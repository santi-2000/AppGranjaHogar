export class PermissionVO {
    constructor(db_permission) {
        this.id = db_permission.id;
        this.permission = db_permission.permission;
        
        Object.freeze(this);
    }
}