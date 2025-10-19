export class ProductCatalogVO {
    constructor(dbProduct) {
        this.id = dbProduct.id;
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.is_perishable);
        this.category = dbProduct.category;
        this.unit = dbProduct.unit;
        
        Object.freeze(this);
    }
}


