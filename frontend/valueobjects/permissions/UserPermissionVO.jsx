/**
 * @class UserPermissionVO
 * @description Value Object for a user's permission data including all assigned permissions
 * and utility methods to check and manage permissions.
 * 
 * @param {Object} dbUserPermission - The user permission data from the database.
 * @param {string|number} dbUserPermission.user_id - The unique identifier of the user.
 * @param {Array<PermissionVO>} [dbUserPermission.permissions=[]] - Array of permission objects assigned to the user.
 * @param {number} [dbUserPermission.permission_count=0] - The total count of permissions assigned to the user.
 * 
 * @author Amada Leticia García Cázares
 */

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