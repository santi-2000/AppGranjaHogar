/**
 * Value Object representing a user's permissions data.
 * @class UserPermissionVO
 * @description This value object represents a user's permission data including all assigned permissions
 * and permission count.
 * 
 * @param {string|number} user_id - The unique identifier of the user.
 * @param {Array<PermissionVO>} permissions - Array of PermissionVO objects assigned to the user.
 * 
 * @author Amada Leticia García Cázares
 */
export class UserPermissionVO {
    constructor(user_id, permissions) {
        this.user_id = parseInt(user_id);
        this.permissions = permissions;
        this.permission_count = permissions.length;
        
        Object.freeze(this);
    }
}