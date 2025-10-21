/**
 * @class PermissionVO
 * @description Value Object for a permission with its basic properties.
 * 
 * @param {Object} dbPermission - The permission data from the database.
 * @param {number} dbPermission.id - The unique identifier of the permission.
 * @param {string} dbPermission.permission - The permission name or description.
 * 
 * @author Amada Leticia García Cázares
 */
export class PermissionVO {
    constructor(dbPermission) {
        this.id = dbPermission.id;
        this.permission = dbPermission.permission;
    }
}