/**
 * @module valueObjects/reports/productReport
 * @description Value Object representing a product report.
 * 
 * @param {Object} dbProduct - The product data from the database.
 * @param {string} dbProduct.name - The name of the product.
 * @param {number} dbProduct.is_perishable - Indicates if the product is perishable (1 for true, 0 for false).
 * @param {number} dbProduct.category_id - The category ID of the product.
 * @param {number} dbProduct.unit_id - The unit ID of the product.
 * @param {number} dbProduct.min_stock - The minimum stock level for the product.
 * @param {number} dbProduct.max_stock - The maximum stock level for the product.
 * @param {number} dbProduct.actual_stock - The actual stock level of the product.
 * @param {Date} dbProduct.created_at - The date when the product was created.
 * @param {Date} dbProduct.updated_at - The date when the product was last updated.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */

import { format } from "date-fns"

export class ProductReportVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.is_perishable);
        this.category = dbProduct.category_id;
        this.unit = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;
        this.actual_stock = dbProduct.actual_stock;
        this.created_at = dbProduct.created_at;
        this.updated_at = dbProduct.updated_at;
        
        Object.freeze(this);
    }

    getFormattedCreatedAt() {
        return format(this.created_at, "MM-dd-yy HH:mm");
    }

    getFormattedUpdatedAt() {
        return format(this.updated_at, "MM-dd-yy HH:mm");
    }
}