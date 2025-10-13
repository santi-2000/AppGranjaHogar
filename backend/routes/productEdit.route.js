import { Router } from "express"
import { check, param } from "express-validator"
import { UpdateProduct } from "../controllers/productEdit.controller.js"

const router = Router()

router.put(
    "/editar/:id",
    [
        param("id").isInt().withMessage("ID debe ser un número entero"),
        check("name").notEmpty().withMessage("El nombre es requerido"),
        check("category_id").isInt().withMessage("category_id debe ser un número entero"),
        check("unit_id").isInt().withMessage("unit_id debe ser un número entero"),
        check("perishable").isBoolean().withMessage("perishable debe ser un booleano"),
        check("min_stock").isInt().withMessage("min_stock debe ser un número entero"),
        check("max_stock").isInt().withMessage("max_stock debe ser un número entero"),
        check("actual_stock").isInt().withMessage("actual_stock debe ser un número entero"),
        check("is_active").isBoolean().withMessage("is_active debe ser un booleano")
    ],
    UpdateProduct
)

export default router