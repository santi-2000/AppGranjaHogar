export class PermissionVO {
    constructor(dbPermission) {
        this.id = dbPermission.id;
        this.permission = dbPermission.permission;
    }
}

export class UserPermissionVO {
    constructor(dbUserPermission) {
        this.user_id = dbUserPermission.user_id;
        this.permissions = dbUserPermission.permissions || [];
        this.permission_count = dbUserPermission.permission_count || 0;
    }

    hasPermission(permissionId) {
        return this.permissions.some(p => p.id === permissionId);
    }

    getPermissionIds() {
        return this.permissions.map(p => p.id);
    }
}