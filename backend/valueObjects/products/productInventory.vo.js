/**
 * @class ProductInventoryVO
 * @author Roberto Santiago Estrada Orozco
 * @description This file defines the ProductInventoryVO (Value Object) class,
 * which encapsulates data related to a product's inventory information.
 * @module valueObjects/products/productInventory
 * @example
 * import { ProductInventoryVO } from '../valueObjects/products/productInventory.vo.js';
 * const productInventoryVO = new ProductInventoryVO(dbProduct);
 */

export class ProductInventoryVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.quantity = dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit_id || 'unidad';
        
        Object.freeze(this);
    }
}
