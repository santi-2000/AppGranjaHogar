import { Router } from "express"
import { check, param } from "express-validator" 
import productEntriesController from "../controllers/productEntries.controller.js"

const router = Router()

router.post("/create-entry", productEntriesController.createEntry)
router.get("/entries", productEntriesController.getAllEntries)
router.get("/:id", productEntriesController.getEntryById)

module.exports = router;

export default router
