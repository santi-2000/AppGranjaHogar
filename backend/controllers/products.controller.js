import { getCatalogService, getProductQuantityService, getInventoryService } from "../services/products.service.js";
import { validationResult } from 'express-validator'

export const getCatalog = async (req, res) => {
    try {
        let result = validationResult(req);

        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });

        const catalog = await getCatalogService()

        res.json(catalog)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error" });
    }
}

export const getProductQuantity = async (req, res) => {
    try {
        let result = validationResult(req);
        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });
        const { id } = req.params
        const productQuantity = await getProductQuantityService(id)
        res.json(productQuantity)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error" });
    }
}

export const getInventory = async (req, res) => {
    try {
        const inventory = await getInventoryService()
        res.json(inventory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error" });
    }
}