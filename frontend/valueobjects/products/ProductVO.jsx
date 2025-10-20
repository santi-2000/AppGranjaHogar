export class ProductVO {
    constructor(dbProduct) {

        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.perishable);
        this.category_id = dbProduct.category_id;
        this.unit_id = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;
        this.actual_stock = dbProduct.actual_stock || 0;
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
