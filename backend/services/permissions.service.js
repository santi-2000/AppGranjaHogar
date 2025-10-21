import { permissionsModel } from "../models/permissions.model.js";
import { UserPermissionVO } from "../valueObjects/permissions/userPermission.vo.js";
import { PermissionVO } from "../valueObjects/permissions/permission.vo.js";


/**
 * Service class for handling permissions business logic.
 * @class PermissionService
 * @description This service manages permissions-related business logic including fetching all permissions,
 * retrieving user-specific permissions, and updating user permissions. It handles data transformation
 * between database models and value objects.
 * 
 * @author Amada Leticia García Cázares
 */

class PermissionService {
    /**
     * Retrieves all available permissions from the database.
     * @async
     * @method getAllPermissions
     * @returns {Promise<PermissionVO[]>} A promise that resolves to an array of PermissionVO objects.
     */
    async getAllPermissions() {
        const rows = await permissionsModel.getAllPermissions();
        return rows.map(db_permission => new PermissionVO(db_permission));
    }

    /**
     * Retrieves permissions for a specific user.
     * @async
     * @method getUserPermissions
     * @param {string|number} user_id - The ID of the user whose permissions to fetch.
     * @returns {Promise<UserPermissionVO>} A promise that resolves to a UserPermissionVO object.
     */
    async getUserPermissions(user_id) {
        const permissions = await permissionsModel.getUserPermissions(user_id);
        const permissionVOs = permissions.map(p => new PermissionVO(p));
        return new UserPermissionVO(user_id, permissionVOs);
    }

    /**
     * Updates permissions for a specific user by replacing all existing permissions.
     * @async
     * @method updateUserPermissions
     * @param {string|number} user_id - The ID of the user whose permissions to update.
     * @param {Array<number>} permission_ids - Array of permission IDs to assign to the user.
     * @returns {Promise<Object>} A promise that resolves to an object with success status and message.
     */
    async updateUserPermissions(user_id, permission_ids) {
        await permissionsModel.deleteUserPermissions(user_id);
        if (permission_ids.length > 0) {
            await permissionsModel.insertUserPermissions(user_id, permission_ids);
        }
        return {
            success: true,
            message: 'Permisos actualizados exitosamente'
        };
    }
}

export const permissionsService = new PermissionService();