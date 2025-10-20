export class CatalogVO {
    constructor(productData) {
        this.id = productData.id;
        this.name = productData.name;
        this.perishable = productData.perishable;
        this.category = productData.category;
        this.unit = productData.unit;
    }
}