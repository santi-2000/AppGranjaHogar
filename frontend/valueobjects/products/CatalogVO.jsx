/**
 * @class CatalogVO
 * @description Value Object representing a product catalog item.
 *
 * @param {Object} productData - The raw product data from the API response.
 * @param {number} productData.id - The unique identifier of the product.
 * @param {string} productData.name - The name of the product.
 * @param {boolean} productData.perishable - Whether the product is perishable or not.
 * @param {string} productData.category - The category to which the product belongs.
 * @param {string} productData.unit - The unit of measurement for the product.
 *
 * @author Yahir Alfredo Tapia Sifuentes
 */
export class CatalogVO {
    constructor(productData) {
        this.id = productData.id;
        this.name = productData.name;
        this.perishable = productData.perishable;
        this.category = productData.category;
        this.unit = productData.unit;
    }
}