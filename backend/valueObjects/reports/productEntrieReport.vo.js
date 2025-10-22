/**
 * @module valueObjects/reports/productEntrieReport
 * @description Value Object representing a product entry report.
 * 
 * @param {Object} dbProduct - The product data from the database.
 * @param {string} dbProduct.name - The name of the product.
 * @param {string} dbProduct.user - The user associated with the entry.
 * @param {string} dbProduct.unit - The unit of the product.
 * @param {boolean} dbProduct.is_donation - Indicates if the entry is a donation.
 * @param {number} dbProduct.quantity - The quantity of the product in the entry.
 * @param {Date} dbProduct.exp_date - The expiration date of the product.
 * @param {Date} dbProduct.created_at - The date when the entry was created.
 *
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 */
import { format } from "date-fns"

export class ProductEntrieReportVO {
    constructor(dbProduct) {
        this.productName = dbProduct.name;
        this.user = dbProduct.user;
        this.unit = dbProduct.unit;
        this.isDonation = dbProduct.is_donation;
        this.quantity = dbProduct.quantity;
        this.exp_date = dbProduct.exp_date;
        this.created_at = dbProduct.created_at;
        
        Object.freeze(this);
    }

    getFormattedCreatedAt() {
        return format(this.created_at, "MM-dd-yy HH:mm");
    }

    getFormattedExpDate() {
        return format(this.exp_date, "MM-dd-yy HH:mm");
    }
}