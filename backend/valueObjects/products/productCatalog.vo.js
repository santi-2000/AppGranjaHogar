/**
 * @module valueObjects/products/productCatalog
 * @description Value Object representing a product in the catalog.
 * 
 * @param {Object} dbProduct - Product data from the database.
 * @param {number} dbProduct.id - Unique identifier for the product.
 * @param {string} dbProduct.name - Name of the product.
 * @param {number} dbProduct.is_perishable - Indicates if the product is perishable (1 for true, 0 for false).
 * @param {string} dbProduct.category - Category of the product.
 * @param {string} dbProduct.unit - Unit of measurement for the product.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 */
export class ProductCatalogVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.is_perishable);
        this.category = dbProduct.category;
        this.unit = dbProduct.unit;
        
        Object.freeze(this);
    }
}


