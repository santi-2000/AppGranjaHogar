export class productEntryVO {
    constructor(dbEntry) {
        this.product_id = parseInt(dbEntry.id);
        this.user_id = parseInt(dbEntry.user_id);
        this.unit_id = parseInt(dbEntry.unit_id);
        this.is_donation = Boolean(dbEntry.is_donation);
        this.quantity = parseFloat(dbEntry.quantity);
        this.cost = entry.is_donation ? null : parseFloat(dbEntry.cost);
        this.exp_date =  entry.exp_date ? new Date(exp_date) : null; 
        this.created_at = new Date();
        this.validate();
    }

//validar datos de entrada
validate(){
    if (!this.product_id || !this.user_id || !this.unit_id)
        throw new Error("¡Faltan campos obligatorios!")
    if (isNaN(this.quantity) || this.quantity <= 0)
        throw new Error("¡Cantidad inválida!")
    if (!this.is_donation && (this.cost === null || isNaN(this.cost)))
        throw new Error("Debe de incluir costo si no es una donación")
    if (this.exp_date && isNaN(this.exp_date.getTime()))
        throw new Error("Fecha de caducidad inválida");
    }
}
