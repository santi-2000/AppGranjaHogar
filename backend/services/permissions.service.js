import { permissionsModel } from "../models/permissions.model.js";
import { UserPermissionVO } from "../valueObjects/permissions/userPermission.vo.js";
import { PermissionVO } from "../valueObjects/permissions/permission.vo.js";

class PermissionService {
    async getAllPermissions() {
        const rows = await permissionsModel.getAllPermissions();
        return rows.map(db_permission => new PermissionVO(db_permission));
    }

    async getUserPermissions(user_id) {
        const permissions = await permissionsModel.getUserPermissions(user_id);
        const permissionVOs = permissions.map(p => new PermissionVO(p));
        return new UserPermissionVO(user_id, permissionVOs);
    }

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