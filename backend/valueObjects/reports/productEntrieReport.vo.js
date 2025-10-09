import { format } from "date-fns"

export class ProductEntrieReportVO {
    constructor(dbProduct) {
        this.productName = dbProduct.name;
        this.user = dbProduct.user;
        this.unit = dbProduct.unit;
        this.isDonation = dbProduct.is_donation;
        this.quantity = dbProduct.quantity;
        this.exp_date = dbProduct.exp_date;
        this.created_at = dbProduct.created_at;
        
        Object.freeze(this);
    }

    getFormattedCreatedAt() {
        return format(this.created_at, "MM-dd-yy HH:mm");
    }

    getFormattedExpDate() {
        return format(this.exp_date, "MM-dd-yy HH:mm");
    }
}