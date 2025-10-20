import { Router } from "express"
import { body, check, param } from "express-validator"
import { productEntriesController } from "../controllers/productEntries.controller.js"
import { AppError } from "../utils/error.util.js"
import { validate } from "../middlewares/validator.middleware.js"
import { authAuthorizePermissions, authMiddlewareLogged } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/new", [
    authAuthorizePermissions("products-entries"),
    body("product_id").notEmpty().isInt().withMessage("product_id es obligatorio y debe ser un número entero"),
    body("user_id").notEmpty().isInt().withMessage("user_id es obligatorio y debe ser un número entero"),
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

router.get("/:id", [
    authAuthorizePermissions("products-entries"),
    param("id").notEmpty().isInt().withMessage("id es obligatorio y debe ser un número entero"),
    validate
],
    productEntriesController.getEntryById)

export default router;
