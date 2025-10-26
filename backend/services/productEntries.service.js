/**
 * @file Servicio para gestionar las entradas de productos.
 * @author Dania Sagarnaga Macías
 */

import { ProductEntryVO } from "../valueObjects/products/productEntries.vo.js";
import { productEntriesModel } from "../models/productEntries.model.js";
import { productsModel } from "../models/products.model.js"; 
import { notificationsModel } from "../models/notifications.model.js";
import { getUnitNameById } from "../utils/units.util.js";

class ProductEntriesService {
 
  async create(data) {
    /**
     * Crea una nueva entrada de producto y actualiza el stock del producto asociado.
     * @param {Object} data - Datos de la entrada de producto.
     * @returns {Object} Resultado con mensaje, entrada creada y stock actualizado.
     */

    const entryVO = new ProductEntryVO(data);
    
    const product = await productsModel.getById(entryVO.product_id);

    if (!product) throw new Error("Producto no encontrado");
    if (!product.is_active) throw new Error("El producto no está activo");


    const id = await productEntriesModel.create(entryVO);
    const entry = { id, ...entryVO };
  
    const newStock = parseFloat(product.actual_stock || 0) + parseFloat(entry.quantity);

    await productsModel.update(entryVO.product_id, { actual_stock: newStock });

    await notificationsModel.createNotification({
      user_id: entryVO.user_id,
      product_id: entryVO.product_id,
      product_entry_id: id,
      content: `Se ha registrado una nueva entrada de ${entryVO.quantity}${getUnitNameById(product.unit_id)} para el producto ${product.name}.`,
      type_id: 4,
      permission_id: 2
    });

    return {
      message: `Entrada creada por el usuario ${entryVO.user_id} y stock actualizado correctamente`,
      entry,
      updated_stock: newStock
    };
  }

  async getAll() {
    /**
     * Obtiene todas las entradas de productos.
     * @returns {Array} Lista de entradas de productos.
     */
    return await productEntriesModel.getAll();
  }

  async getById(id) {
    /**
     * Obtiene una entrada de producto por su ID.
     * @param {number} id - ID de la entrada de producto.
     * @returns {Object} Entrada de producto correspondiente al ID.
     */
    const entry = await productEntriesModel.getById(id);
    if (!entry) throw new Error("Entrada no encontrada");
    return entry;
  }
}

export const productEntriesService = new ProductEntriesService();