import { format } from "date-fns"

export class ProductReportVO {
    constructor(dbProduct) {
        this.name = dbProduct.name;
        this.perishable = Boolean(dbProduct.is_perishable);
        this.category = dbProduct.category_id;
        this.unit = dbProduct.unit_id;
        this.min_stock = dbProduct.min_stock;
        this.max_stock = dbProduct.max_stock;
        this.actual_stock = dbProduct.actual_stock;
        this.created_at = dbProduct.created_at;
        this.updated_at = dbProduct.updated_at;
        
        Object.freeze(this);
    }

    getFormattedCreatedAt() {
        return format(this.created_at, "MM-dd-yy HH:mm");
    }

    getFormattedUpdatedAt() {
        return format(this.updated_at, "MM-dd-yy HH:mm");
    }
}