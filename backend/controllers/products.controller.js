import { getCatalogService, getProductQuantityService, getInventoryService, createProductService, deleteProductService } from "../services/products.service.js";
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

export const createProduct = async (req, res) => {

    console.log("Creating product with data:", req.body);
    
    try {
        let result = validationResult(req);

        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });

        const { category_id, unit_id, name, perishable, min_stock, max_stock } = req.body;

        const creationResult = await createProductService(category_id, unit_id, name, perishable, min_stock, max_stock);

        if (!creationResult.success) {
            return res.status(500).json(creationResult);
        }

        res.json(creationResult);
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let result = validationResult(req);

        if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });

        const { id } = req.params;

        const deletionResult = await deleteProductService(id);

        if (!deletionResult.success) {
            return res.status(500).json(deletionResult);
        }

        res.json(deletionResult);
    } catch (error) {
        console.log(error)
        res.status(500).json({ "Error": "Error" });
    }
}