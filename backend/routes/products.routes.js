import { Router } from "express"
import { check, param } from "express-validator" 
import { getCatalog } from "../controllers/products.controller.js"

const router = Router()

router.get("/catalog", getCatalog)

export default router
