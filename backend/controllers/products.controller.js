import { getCatalogService } from "../services/products.service.js";
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