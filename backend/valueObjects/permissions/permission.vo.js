/**
 * Value Object representing a permission entity from the database.
 * @class PermissionVO
 * @description This immutable value object represents a permission with its basic properties.
 * It provides a structured way to handle permission data from the database and ensures immutability.
 * 
 * @param {Object} db_permission - The permission data from the database.
 * @param {number} db_permission.id - The unique identifier of the permission.
 * @param {string} db_permission.permission - The permission name or description.
 * 
 * @author Amada Leticia García Cázares
 */
export class PermissionVO {
    constructor(db_permission) {
        this.id = db_permission.id;
        this.permission = db_permission.permission;
        
        Object.freeze(this);
    }
}