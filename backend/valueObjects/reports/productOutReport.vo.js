/**
 * @module valueObjects/reports/productOutReport
 * @description Value Object representing a product out report.
 *
 * @param {Object} dbProduct - The product data from the database.
 * @param {string} dbProduct.userName - The user associated with the product out entry.
 * @param {string} dbProduct.productName - The name of the product.
 * @param {string} dbProduct.reason - The reason for the product being removed.
 * @param {string} dbProduct.departmentName - The department associated with the product out.
 * @param {string} dbProduct.unit - The unit of the product.
 * @param {number} dbProduct.quantity - The quantity of the product being removed.
 * @param {string} dbProduct.notes - Any additional notes for the product out.
 * @param {Date} dbProduct.created_at - The date when the product out entry was created.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */
import { format } from "date-fns"

export class ProductOutReportVO {
    constructor(dbProduct) {
        this.userName = dbProduct.userName;
        this.productName = dbProduct.productName;
        this.reason = dbProduct.reason;
        this.departmentName = dbProduct.departmentName;
        this.unit = dbProduct.unit;
        this.quantity = dbProduct.quantity;
        this.notes = dbProduct.notes;
        this.createdAt = dbProduct.created_at;
        
        Object.freeze(this);
    }

    getFormattedCreatedAt() {
        return format(this.createdAt, "MM-dd-yy HH:mm");
    }

    getFormattedExpDate() {
        return format(this.createdAt, "MM-dd-yy HH:mm");
    }
}