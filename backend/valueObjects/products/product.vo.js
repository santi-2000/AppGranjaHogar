export class ProductVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.perishable);
        this.category_id = dbProduct.category_id;
        this.unit_id = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;

        Object.freeze(this);
    }
}