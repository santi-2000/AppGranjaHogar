export class ProductQuantityVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.quantity = dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit_id || 'unidad';

        Object.freeze(this);
    }
}
