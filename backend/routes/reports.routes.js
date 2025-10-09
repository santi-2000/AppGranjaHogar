import { Router } from "express"
import { check, param } from "express-validator" 
import { postReportPDF, postReportXLSX } from "../controllers/reports.controller.js"

const router = Router()

router.post("/pdf",[
    check("initialDate").notEmpty().withMessage("La fecha inicial no puede estar vacía").isISO8601().withMessage("La fecha inicial debe ser una fecha válida"),
    check("endDate").notEmpty().withMessage("La fecha final no puede estar vacía").isISO8601().withMessage("La fecha final debe ser una fecha válida"),
    check("type").notEmpty().withMessage("El tipo no puede estar vacío").isArray().withMessage("El tipo debe ser un arreglo").custom((value) => {
        if (!value.every(item => typeof item === 'number')) throw new Error("El tipo debe ser un arreglo de numeros");
        return true;
    }),
], postReportPDF)

router.post("/xlsx",[
    check("initialDate").notEmpty().withMessage("La fecha inicial no puede estar vacía").isISO8601().withMessage("La fecha inicial debe ser una fecha válida"),
    check("endDate").notEmpty().withMessage("La fecha final no puede estar vacía").isISO8601().withMessage("La fecha final debe ser una fecha válida"),
    check("type").notEmpty().withMessage("El tipo no puede estar vacío").isArray().withMessage("El tipo debe ser un arreglo").custom((value) => {
        if (!value.every(item => typeof item === 'number')) throw new Error("El tipo debe ser un arreglo de numeros");
        return true;
    }),
], postReportXLSX)

export default router
