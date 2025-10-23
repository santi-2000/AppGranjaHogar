import { ProductEntryVO } from "../valueObjects/products/productEntries.vo.js";
import { productEntriesModel } from "../models/productEntries.model.js";
import { productsModel } from "../models/products.model.js"; 

class ProductEntriesService {
  /**
   * Crea una nueva entrada y actualiza el stock del producto.
   * @param {Object} data - Datos de la nueva entrada
   * @returns {Object} Resultado con mensaje, entrada creada y stock actualizado
   * @author Dania Sagarnaga Macías
   */
  async create(data) {
    const entryVO = new ProductEntryVO(data);
    
    const product = await productsModel.getById(entryVO.product_id);

    if (!product) throw new Error("Producto no encontrado");
    if (!product.is_active) throw new Error("El producto no está activo");

    const id = await productEntriesModel.create(entryVO);
    const entry = { id, ...entryVO };
  
    const newStock = parseFloat(product.actual_stock || 0) + parseFloat(entry.quantity);

    await productsModel.update(entryVO.product_id, { actual_stock: newStock });

    return {
      message: `Entrada creada por el usuario ${entryVO.user_id} y stock actualizado correctamente`,
      entry,
      updated_stock: newStock
    };
  }

  /**
   * Obtiene todas las entradas registradas.
   */
  async getAll() {
    return await productEntriesModel.getAll();
  }

  /**
   * Obtiene una entrada específica por su ID.
   */
  async getById(id) {
    const entry = await productEntriesModel.getById(id);
    if (!entry) throw new Error("Entrada no encontrada");
    return entry;
  }
}

export const productEntriesService = new ProductEntriesService();