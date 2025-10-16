import {
    getAllPermissionsModel,
    getUserPermissionsModel,
    deleteUserPermissionsModel,
    insertUserPermissionsModel
} from "../models/permissions.model.js";
import { UserPermissionVO } from "../valueObjects/permissions/userPermission.vo.js";
import { PermissionVO } from "../valueObjects/permissions/permission.vo.js";

export const getAllPermissionsService = async () => {
    const rows = await getAllPermissionsModel();

    if (!rows || !Array.isArray(rows)) return [];

    return rows.map(db_permission => new PermissionVO(db_permission));
}

export const getUserPermissionsService = async (user_id) => {
    const permissions = await getUserPermissionsModel(user_id);

    const permissionVOs = permissions.map(p => new PermissionVO(p));
    
    return new UserPermissionVO(user_id, permissionVOs);
}

export const updateUserPermissionsService = async (user_id, permission_ids) => {

    await deleteUserPermissionsModel(user_id);

    if (permission_ids.length > 0) {
        await insertUserPermissionsModel(user_id, permission_ids);
    }
    
    return {
        success: true,
        message: 'Permisos actualizados exitosamente'
    };
}