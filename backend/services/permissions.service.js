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
    const rows = await getUserPermissionsModel(user_id);

    if (!rows || !Array.isArray(rows)) return [];

    const permissions = rows.map(db_permission => new PermissionVO(db_permission));

    return new UserPermissionVO(user_id, permissions);
}

export const updateUserPermissionsService = async (user_id, permission_ids) => {

    await deleteUserPermissionsModel(user_id);

    if (permission_ids && permission_ids.length > 0) {
        await insertUserPermissionsModel(user_id, permission_ids);
    }
    
    return { success: true, message: "Permisos actualizados exitosamente" };
}