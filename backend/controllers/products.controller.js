/**
 * @module controllers/products
 * 
 * @description This module defines the ProductsController class which handles HTTP requests related to products.
 *              It interacts with the ProductsService to perform operations such as retrieving product catalogs,
 *              managing inventory, and handling product creation, deletion, and updates.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * @author Carlos Alejandro Ortiz Caro
 * @author Samuel Isaac Lopez Mar
 * @author Roberto Santiago Estrada Orozco
 * @author Renata Loaiza
 * 
 * @example
 * import { productsController } from '../controllers/products.controller.js';
 * app.get('/products/catalog', productsController.getCatalog); 
 */

import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productsService } from "../services/products.service.js";

class ProductsController {
    constructor() {
        /**
         * @description Binds controller methods to the instance and wraps them with error handling.
         */
        this.getCatalog = catchAsync(this.getCatalog.bind(this));
        this.getProductQuantity = catchAsync(this.getProductQuantity.bind(this));
        this.getInventory = catchAsync(this.getInventory.bind(this));
        this.createProduct = catchAsync(this.createProduct.bind(this));
        this.deleteProduct = catchAsync(this.deleteProduct.bind(this));
        this.UpdateProduct = catchAsync(this.UpdateProduct.bind(this));
        this.getAvailableProducts = catchAsync(this.getAvailableProducts.bind(this));
    }

    /**
     * @description Get the full product catalog from the database. @author Yahir Alfredo Tapia Sifuentes
     */
    async getCatalog(req, res) {
        const result = await productsService.getCatalog();
        res.json(result);
    }

    /**
     * @author Roberto Santiago Estrada Orozco
     */
    async getProductQuantity(req, res) {
        const { id } = req.params;
        const result = await productsService.getProductQuantity(id);
        res.json(result);
    }
/**
 * 
 * @author Roberto Santiago Estrada Orozco
 */
    async getInventory(req, res) {
        const result = await productsService.getInventory();
        res.json(result);
    }

    async createProduct(req, res) {
        const { category_id, unit_id, name, perishable, min_stock, max_stock } = req.body;
        const result = await productsService.addProduct(category_id, unit_id, name, perishable, min_stock, max_stock);
        res.json(result);
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        const result = await productsService.removeProduct(id);
        res.json(result);
    }

    /**
     * @author Renata Loaiza
     */
    async UpdateProduct (req, res) {
        const { id } = req.params;
        const updateData = req.body;
        const result = await productsService.editProduct(updateData, id);
        res.json(result);
    }

    async getAvailableProducts (req, res) {
        const result = await productsService.getAvailableProducts()
        res.json(result);
    }
    
    async getAvailableProductsForEntries (req, res) {
        const result = await productsService.getAvailableProductsForEntries()
        res.json(result);
    }
}

export const productsController = new ProductsController();