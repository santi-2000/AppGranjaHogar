/**
 * @module models/products
 * 
 * @description This module defines the ProductsModel class which handles database operations
 *              related to products, including retrieval, creation, updating, and deletion.
 * @param {Object} db - The database connection object.
 * @returns {ProductsModel} An instance of ProductsModel for managing product data.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * @author Carlos Alejandro Ortiz Caro
 * @author Roberto Santiago Estrada Orozco
 * @author Samuel Isaac Lopez Mar
 * @author Renata Loaiza
 * 
 * @example
 * import { productsModel } from '../models/products.model.js';
 * const catalog = await productsModel.getCatalog();    
 */

import db from "./index.js"

class ProductsModel {
    /**
     * @description Retrieves the product catalog with category and unit information for active products. @author Yahir Alfredo Tapia Sifuentes
     */
    async getCatalog() {
        const sql = `
        SELECT products.id, products.name, categories.name AS category, units.name AS unit, products.perishable, products.min_stock, products.max_stock, products.actual_stock
        FROM products AS products
        JOIN categories AS categories ON products.category_id = categories.id
        JOIN units AS units ON products.unit_id = units.id
        WHERE is_active = ?
        ORDER BY products.name ASC
        `;
        return await db.query(sql, [true]);
    }

    /**
     * @description Retrieves the actual stock and unit id of a specific active product by its id.
     * @param {*} id 
     * @returns {Promise<Object>} - An object containing the product's name, actual stock, and unit id.
     * @author Roberto Santiago Estrada Orozco 
     */
    async getProductQuantity(id) {
        const [rows] = await db.query(`SELECT name, actual_stock, unit_id FROM products WHERE id = ? AND is_active = ?`, [id, true]);
        return rows[0];
    }

    /**
     * @description Retrieves the inventory of active products with their id, name, actual stock, and unit id.
     * @returns {Promise<Array>} - An array of products with their id, name, actual stock, and unit id.
     * @author Roberto Santiago Estrada Orozco
     */
    async getInventory() {
        const sql = `SELECT id, name, actual_stock, unit_id FROM products WHERE is_active = ? ORDER BY name ASC `;
        const [rows] = await db.query(sql, [true]);
        return rows;
    }

    async createProduct(category_id, unit_id, name, perishable, min_stock, max_stock) {
        const sql = 'INSERT INTO products (category_id, unit_id, name, perishable, min_stock, max_stock, actual_stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
        return await db.query(sql, [category_id, unit_id, name, perishable, min_stock, max_stock]);
    }

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    /**
     * @author Renata Loaiza
     */
    async update(id, updateData) {
        const fields = [];
        const values = [];

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        values.push(id);

        const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            throw new Error("Product not found or no changes made");
        }

        return await this.getById(id);
    }

    async deleteProduct(id) {
        const sql = 'UPDATE products SET deleted_at = CURRENT_TIMESTAMP, is_active = FALSE WHERE id = ?';
        return await db.query(sql, [id]);
    }

    async getAvailableProducts() {
    const sql = 'SELECT id, name, perishable, unit_id FROM products WHERE actual_stock > 0 AND is_active = TRUE ORDER BY name;';
    const [rows] = await db.query(sql);
    return rows;
}

}

export const productsModel = new ProductsModel();