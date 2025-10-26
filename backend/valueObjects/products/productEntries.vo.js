/**
 * Value Object para una entrada de producto.
 * @module valueObjects/products/productEntries
 * @author Dania Sagarnaga Macías
 */

export class ProductEntryVO {
  constructor(entry) {
    
    /**
     * Crea una instancia de ProductEntryVO.
     * @param {Object} entry - Datos de la entrada del producto.
     * @param {number} entry.product_id - ID del producto.
     * @param {number} entry.user_id - ID del usuario que registra la entrada.
     * @param {number} entry.unit_id - ID de la unidad de medida.
     * @param {boolean} entry.is_donation - Indica si la entrada es una donación.
     * @param {number} entry.quantity - Cantidad del producto.
     * @param {number} [entry.cost] - Costo del producto (opcional).
     * @param {string} [entry.exp_date] - Fecha de expiración del producto (opcional).     *
     */

    this.product_id = parseInt(entry.product_id);
    this.user_id = parseInt(entry.user_id);
    this.unit_id = parseInt(entry.unit_id);
    this.is_donation = Boolean(entry.is_donation);
    this.quantity = parseFloat(entry.quantity);
    this.cost = this.is_donation ? null : parseFloat(entry.cost);
    this.exp_date = entry.exp_date ? new Date(entry.exp_date) : null;

    Object.freeze(this);
  }
}