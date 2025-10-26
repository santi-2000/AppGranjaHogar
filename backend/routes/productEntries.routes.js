/**
 * @module routes/productEntries.routes
 * @description Rutas para gestionar las entradas de productos.
 * @author Dania Sagarnaga Macías
 */

import { Router } from "express"
import { body, check, param } from "express-validator"
import { productEntriesController } from "../controllers/productEntries.controller.js"
import { AppError } from "../utils/error.util.js"
import { validate } from "../middlewares/validator.middleware.js"
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js"

const router = Router()
router.post("/new", [
/** 
 * Ruta para crear una nueva entrada de producto.
 * @middleware {function} authAuthorizePermissions - Requiere permiso "products-entries".
 * @middleware {function} body - Valida los campos del cuerpo de la solicitud.
 * @middleware {function} validate - Middleware de express-validator para verificar los resultados de la validación.
 * @return {Object} Respuesta con el resultado de la creación de la entrada.
 */
    authAuthorizePermissions("products-entries"),
    body("product_id").notEmpty().isInt().withMessage("product_id es obligatorio y debe ser un número entero"),
    body("unit_id").notEmpty().isInt().withMessage("unit_id es obligatorio y debe ser un número entero"),
    body("is_donation").notEmpty().isBoolean().withMessage("is_donation es obligatorio y debe ser booleano"),
    body("quantity").notEmpty().isFloat({ gt: 0 }).withMessage("quantity es obligatorio y debe ser un número positivo"),
    body("cost").custom((value, { req }) => {
        if (!req.body.is_donation && (value === null || value === undefined || isNaN(parseFloat(value)))) {
            throw new AppError("cost es obligatorio y debe ser un número cuando is_donation es false", 400);
        }
        return true;
    }),
    body("exp_date").optional({ checkFalsy: true }).isISO8601().toDate().withMessage("exp_date debe ser una fecha válida si se proporciona"),
    validate
],
    productEntriesController.createEntry)


router.get("/", authAuthorizePermissions("products-entries"), productEntriesController.getAllEntries)
/**
 * Ruta para obtener todas las entradas de productos.
 * @middleware {function} authAuthorizePermissions - Requiere permiso "products-entries".
 * @return {Object} Respuesta con la lista de todas las entradas de productos.
 */


router.get("/:id", [
/**
 * Ruta para obtener una entrada de producto por su ID.
 * @middleware {function} authAuthorizePermissions - Requiere permiso "products-entries".
 * @middleware {function} param('id') - Valida que el ID sea un entero no vacío.
 * @middleware {function} validate - Middleware de express-validator para verificar los resultados de la validación.
 * @return {Object} Respuesta con la entrada de producto correspondiente al ID proporcionado.   
 */
    authAuthorizePermissions("products-entries"),
    param("id").notEmpty().isInt().withMessage("id es obligatorio y debe ser un número entero"),
    validate
],
    productEntriesController.getEntryById)

export default router;
