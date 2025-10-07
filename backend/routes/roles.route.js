import {Router} from "express"
import { getRol } from "../controllers/roles.controller.js"

const router = Router()

router.get("/:id", getRol)

export default router
