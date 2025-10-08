export class ProductVO {
    constructor(dbProduct) {

        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.perishable);
        this.category = dbProduct.category_id;
        this.unit = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;
    }
}