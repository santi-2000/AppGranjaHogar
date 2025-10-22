/**
 * @class ProductQuantityVO
 * @description This file defines the ProductQuantityVO (Value Object) class,
 * which encapsulates data related to a product's quantity information.
 * @module valueObjects/products/productQuantity
 * @author Roberto Santiago Estrada Orozco
 * @example
 * import { ProductQuantityVO } from '../valueObjects/products/productQuantity.vo.js';
 * const productQuantityVO = new ProductQuantityVO(dbProduct);
 */
export class ProductQuantityVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.quantity = dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit_id || 'unidad';

        Object.freeze(this);
    }
}
