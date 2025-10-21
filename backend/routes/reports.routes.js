/**
 * @module routers/reports
 * 
 * @description This file defines the routes for report-related operations in the application.
 * It includes routes for generating PDF and XLSX reports.
 * Each route is protected by authentication and authorization middleware to ensure that only authorized users can access them.
 * Input validation is performed using express-validator to ensure data integrity.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * import reportsRoutes from './routes/reports.routes.js';
 * app.use('/v1/reports', reportsRoutes);
 */



import { Router } from "express"
import { check, param } from "express-validator" 
import { reportsController } from "../controllers/reports.controller.js"
import { validate } from "../middlewares/validator.middleware.js"
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/pdf",[
    authAuthorizePermissions("generate-reports"),
    check("initialDate").notEmpty().withMessage("La fecha inicial no puede estar vacía").isISO8601().withMessage("La fecha inicial debe ser una fecha válida"),
    check("endDate").notEmpty().withMessage("La fecha final no puede estar vacía").isISO8601().withMessage("La fecha final debe ser una fecha válida"),
    check("type").notEmpty().withMessage("El tipo no puede estar vacío").isArray().withMessage("El tipo debe ser un arreglo").custom((value) => {
        if (!value.every(item => typeof item === 'number')) throw new Error("El tipo debe ser un arreglo de numeros");
        return true;
    }),
    validate
], reportsController.postReportPDF)

router.post("/xlsx",[
    authAuthorizePermissions("generate-reports"),
    check("initialDate").notEmpty().withMessage("La fecha inicial no puede estar vacía").isISO8601().withMessage("La fecha inicial debe ser una fecha válida"),
    check("endDate").notEmpty().withMessage("La fecha final no puede estar vacía").isISO8601().withMessage("La fecha final debe ser una fecha válida"),
    check("type").notEmpty().withMessage("El tipo no puede estar vacío").isArray().withMessage("El tipo debe ser un arreglo").custom((value) => {
        if (!value.every(item => typeof item === 'number')) throw new Error("El tipo debe ser un arreglo de numeros");
        return true;
    }),
    validate
], reportsController.postReportXLSX)

export default router
