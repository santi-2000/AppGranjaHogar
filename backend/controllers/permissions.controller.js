import { permissionsService } from "../services/permissions.service.js";
import { catchAsync } from '../middlewares/catchAsync.middleware.js';

export class PermissionsController {
    constructor() {
        this.getAllPermissions = catchAsync(this.getAllPermissions.bind(this));
        this.getUserPermissions = catchAsync(this.getUserPermissions.bind(this));
        this.updateUserPermissions = catchAsync(this.updateUserPermissions.bind(this));
    }

    async getAllPermissions(req, res) {
        const permissions = await permissionsService.getAllPermissions();
        res.json(permissions);
    }
    async getUserPermissions(req, res) {
        const user_id = req.params.id;
        const permissions = await permissionsService.getUserPermissions(user_id);

        res.json(permissions);
    }
    async updateUserPermissions(req, res) {
        const user_id = req.params.id;
        const permission_ids = req.body['permission-ids'];

        const updateResult = await permissionsService.updateUserPermissions(user_id, permission_ids);

        res.json(updateResult);
    }
}

export const permissionsController = new PermissionsController();