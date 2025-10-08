import { Router } from "express"
import { check, param } from "express-validator" 
import { getCatalog, getProductQuantity, getInventory } from "../controllers/products.controller.js"

const router = Router()

router.get("/catalog", getCatalog)
router.get("/inventory", getInventory)
router.get("/:id/quantity", [param('id').isInt().withMessage('ID must be a number')], getProductQuantity)

export default router
