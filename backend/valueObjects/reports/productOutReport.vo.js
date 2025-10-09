import { format } from "date-fns"

export class ProductOutReportVO {
    constructor(dbProduct) {
        this.userName = dbProduct.userName;
        this.productName = dbProduct.productName;
        this.reason = dbProduct.reason;
        this.departmentName = dbProduct.departmentName;
        this.unit = dbProduct.unit;
        this.quantity = dbProduct.quantity;
        this.notes = dbProduct.notes;
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