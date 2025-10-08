import { Router } from "express"
import { check, param } from "express-validator" 
import { getCatalog, getProductQuantity, getInventory, createProduct, deleteProduct } from "../controllers/products.controller.js"

const router = Router()

router.get("/catalog", getCatalog)
router.get("/inventory", getInventory)
router.get("/:id/quantity", [param('id').isInt().withMessage('ID must be a number')], getProductQuantity)

router.post("/create", [
    check("category_id", "Category ID debería ser un número").isNumeric(),
    check("unit_id", "Unit ID debería ser un número").isNumeric(),
    check("name", "Name debería ser un string y es necesario").isString().notEmpty(),
    check("perishable", "Perishable debe ser booleano").isBoolean(),
    check("min_stock", "Min stock debería ser un número").isNumeric(),
    check("max_stock", "Max stock debería ser un número").isNumeric()
], createProduct)

router.delete("/delete/:id", [
    param("id", "Product ID debería ser un número").isNumeric()
], deleteProduct)   

export default router
