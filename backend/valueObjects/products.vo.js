/**
 * @fileoverview
 */

export class CatalogVO {
    /**
     * @type {Array<Object>}
     * */
    #products;

    /**
     * @param {Array<Array<Object>>} rows 
     */
    constructor(rows) {
        if (Array.isArray(rows) && Array.isArray(rows[0])) {
            this.#products = Object.freeze(rows[0]);
        } else if (Array.isArray(rows)) {
             this.#products = Object.freeze(rows);
        } else {
            this.#products = Object.freeze([]);
            console.warn("CatalogVO constructor expected an array of products or an array containing the array of products.");
        }
    }

    /**
     * @returns {Array<Object>}
     */
    get products() {
        return this.#products;
    }

    /**
     * @returns {Object}
     */
    toJSON() {
        return {
            products: this.#products
        };
    }
}