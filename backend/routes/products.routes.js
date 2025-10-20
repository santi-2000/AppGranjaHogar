import { Router } from "express"
import { check, param } from "express-validator" 
import { getCatalog, getProductQuantity, getInventory, createProduct, deleteProduct } from "../controllers/products.controller.js"

const router = Router()

router.get("/catalog", getCatalog)

router.post("/create", [
    check("category_id", "Category ID debería ser un número").isNumeric().notEmpty(),
    check("unit_id", "Unit ID debería ser un número").isNumeric().notEmpty(),
    check("name", "Name debería ser un string y es necesario").isString().notEmpty(),
    check("perishable", "Perishable debe ser booleano").isBoolean().notEmpty(),
    check("min_stock", "Min stock debería ser un número").isNumeric().notEmpty(),
    check("max_stock", "Max stock debería ser un número").isNumeric().notEmpty()
], createProduct)

router.delete("/delete/:id", [
    param("id", "Product ID debería ser un número").isNumeric()
], deleteProduct)   
router.get("/inventory", getInventory)
router.get("/:id/quantity", [param('id').isInt().withMessage('ID tiene que ser un numero')], getProductQuantity)

export default router
