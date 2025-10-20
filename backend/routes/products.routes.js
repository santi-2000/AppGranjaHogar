import { Router } from "express"
import { body, param } from "express-validator"
import { productsController } from "../controllers/products.controller.js"
import { validate } from "../middlewares/validator.middleware.js"
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/catalog", authMiddlewareLogged, productsController.getCatalog)

router.post("/create", [
    authAuthorizePermissions("edit_catalog"),
    body("category_id").isNumeric().isInt().notEmpty().withMessage("Category ID es requerido tiene que ser un número"),
    body("unit_id").isNumeric().isInt().notEmpty().withMessage("Unit ID es requerido tiene que ser un número"),
    body("name").isString().notEmpty().trim().escape().toLowerCase().withMessage("Name es requerido y debe ser un texto"),
    body("perishable").isBoolean().notEmpty().withMessage("Perishable es requerido true/false"),
    body("min_stock").isNumeric().isInt().notEmpty().withMessage("Min stock es requerido tiene que ser un número"),
    body("max_stock").isNumeric().isInt().notEmpty().withMessage("Max stock es requerido tiene que ser un número"),
    validate
],
    productsController.createProduct
)

router.delete("/delete/:id", [
    authAuthorizePermissions("edit_catalog"),
    param("id", "Product ID debería ser un número").isNumeric().isInt(),
    validate
],
    productsController.deleteProduct
)

router.put(
    "/editar/:id",
    [
        authAuthorizePermissions("edit_catalog"),
        param("id").isInt().withMessage("ID debe ser un número entero"),
        body("name").notEmpty().withMessage("El nombre es requerido").trim().escape().toLowerCase(),
        body("category_id").notEmpty().isInt().withMessage("category_id debe ser un número entero"),
        body("unit_id").notEmpty().isInt().withMessage("unit_id debe ser un número entero"),
        body("perishable").notEmpty().isBoolean().withMessage("perishable debe ser un booleano"),
        body("min_stock").notEmpty().isInt().withMessage("min_stock debe ser un número entero"),
        body("max_stock").notEmpty().isInt().withMessage("max_stock debe ser un número entero"),
        body("actual_stock").notEmpty().isInt().withMessage("actual_stock debe ser un número entero"),
        body("is_active").notEmpty().isBoolean().withMessage("is_active debe ser un booleano"),
        validate
    ],
    productsController.UpdateProduct
)

router.get("/inventory", authMiddlewareLogged, productsController.getInventory)

router.get("/:id/quantity", [
    authMiddlewareLogged,
    param('id').isInt().withMessage('ID tiene que ser un numero'),
    validate
],
    productsController.getProductQuantity
)

export default router
