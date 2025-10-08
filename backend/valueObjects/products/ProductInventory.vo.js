export class ProductInventoryVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.quantity = dbProduct.actual_stock || 0;
        this.unit = dbProduct.unit_id || 'unidad';
    }
}
