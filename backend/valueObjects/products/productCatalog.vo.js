export class ProductCatalogVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.is_perishable);
        this.category = dbProduct.category_id;
        this.unit = dbProduct.unit_id;
        
        Object.freeze(this);
    }
}


