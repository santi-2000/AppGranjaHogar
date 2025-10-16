import { validationResult } from 'express-validator';
import {
    getAllPermissionsService,
    getUserPermissionsService,
    updateUserPermissionsService
} from "../services/permissions.service.js";

export const getAllPermissions = async (req, res) => {
    try {
        const permissions = await getAllPermissionsService();
        res.json(permissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Error al obtener permisos" });
    }
}

export const getUserPermissions = async (req, res) => {
    try {
        let result = validationResult(req);
        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });
        
        const { user_id } = req.params;
        const permissions = await getUserPermissionsService(user_id);
        
        res.json(permissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Error al obtener permisos del usuario" });
    }
}

export const updateUserPermissions = async (req, res) => {
    try {
        let result = validationResult(req);
        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });
        
        const { user_id } = req.params;
        const { permission_ids } = req.body;
        
        const updateResult = await updateUserPermissionsService(user_id, permission_ids);
        
        res.json(updateResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Error al actualizar permisos" });
    }
}