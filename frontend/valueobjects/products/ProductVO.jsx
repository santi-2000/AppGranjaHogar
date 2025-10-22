/**
 * @class ProductVO
 * @description This module defines the ProductVO class which encapsulates product data
 *              and provides a structured way to interact with product information. 
 * @param {Object} dbProduct - The raw product data from the database.
 * @returns {ProductVO} An instance of ProductVO containing structured product data.
 * @author Carlos Alejandro Ortiz Caro
 */

export class ProductVO {
    constructor(dbProduct) {

        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.perishable);
        this.category_id = dbProduct.category_id;
        this.unit_id = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;
    }
}

export class ProductQuantityVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.quantity = dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit_id || 'unidad';
    }
}

export class ProductInventoryVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.quantity = dbProduct.quantity || dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit || dbProduct.unit_id || 'unidad';
    }
}
