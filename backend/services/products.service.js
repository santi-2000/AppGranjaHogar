/**
 * @module services/products
 * 
 * @description This module provides services for handling product-related operations
 *              such as retrieving product catalog, managing inventory, and CRUD operations.
 * @param {Object} dbProduct - The raw product data from the database.
 * @returns {ProductVO} An instance of ProductVO containing structured product data.
 *  
 * @author Yahir Alfredo Tapia Sifuentes
 * @author Carlos Alejandro Ortiz Caro
 * 
 * @example
 * import { productsService } from './services/products.service.js';
 * 
 * const catalog = await productsService.getCatalog();
 */

import { productsModel } from "../models/products.model.js";
import { ProductCatalogVO } from "../valueObjects/products/productCatalog.vo.js";
import { ProductQuantityVO } from "../valueObjects/products/productQuantity.vo.js";
import { ProductInventoryVO } from "../valueObjects/products/productInventory.vo.js";
import { ProductsAvailableVO } from "../valueObjects/products/productsAvailable.vo.js";
import { ProductVO } from "../valueObjects/products/product.vo.js";
import { AppError } from "../utils/error.util.js";

class ProductsService {
    /**
     * @description Return the full product catalog with VOs. @author Yahir Alfredo Tapia Sifuentes
     */
    async getCatalog() {
        const [rows] = await productsModel.getCatalog()
        if (!rows || !Array.isArray(rows)) return [];

        return rows.map(dbProduct => new ProductCatalogVO(dbProduct));
    }

    async getProductQuantity(id) {
        const product = await productsModel.getProductQuantity(id);
        if (!product) throw new AppError('Product not found');

        return new ProductQuantityVO(product);
    }

    async getInventory() {
        const products = await productsModel.getInventory();
        return products.map(product => new ProductInventoryVO(product));
    }

    async addProduct(category_id, unit_id, name, perishable, min_stock, max_stock) {
        const [result] = await productsModel.createProduct(category_id, unit_id, name, perishable, min_stock, max_stock);

        if (!result || !result.insertId) throw new AppError('Product could not be created');

        const newProduct = new ProductVO({
            category_id,
            unit_id,
            name,
            perishable,
            min_stock,
            max_stock,
        });

        return { success: true, message: "Product created successfully", product: newProduct };
    }

    async removeProduct(id) {
        const [result] = await productsModel.deleteProduct(id);

        if (!result || !result.affectedRows) throw new AppError('Product could not be deleted');

        return { success: true, message: "Product deleted successfully" };
    }

    async editProduct({ category_id, unit_id, name, perishable, min_stock, max_stock, actual_stock, is_active }, productId) {
        const existingProduct = await productsModel.getById(productId);
        if (!existingProduct) throw new AppError('Producto no encontrado');


        const updatedProduct = await productsModel.update(productId, {
            category_id,
            unit_id,
            name,
            perishable,
            min_stock,
            max_stock,
            actual_stock,
            is_active
        });

        return new ProductVO(updatedProduct);
    }

    async getAvailableProducts() {
        const rows = await productsModel.getAvailableProducts()
        if (!rows || !Array.isArray(rows)) return [];

        return rows.map(availableProducts => new ProductsAvailableVO(availableProducts));
    }
}

export const productsService = new ProductsService();