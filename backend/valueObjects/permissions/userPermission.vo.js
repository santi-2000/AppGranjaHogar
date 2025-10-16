export class UserPermissionVO {
    constructor(user_id, permissions) {
        this.user_id = parseInt(user_id);
        this.permissions = permissions;
        this.permission_count = permissions.length;
        
        Object.freeze(this);
    }
}