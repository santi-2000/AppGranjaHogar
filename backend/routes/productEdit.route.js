import { router } from "express"
import { check, param } from "express-validator"
import { UpdateProduct } from "../controllers/productEdit.controller"

const router = Router()

router.update(
    "/editar"
)