import { Router } from "express"
import { check, param } from "express-validator" 
import { ProductEntriesController } from "../controllers/productEntries.controller.js"

const router = Router()

router.post("/create-entry", ProductEntriesController.createEntry)
router.get("/entries", ProductEntriesController.getAllEntries)
router.get("/:id", ProductEntriesController.getEntryById)

export default router;
