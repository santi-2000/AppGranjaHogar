import db from "../models/index.js"
import { getCatalogModel, getProductQuantityModel, getInventoryModel, createProductModel, deleteProductModel } from "../models/products.model.js";
import { ProductCatalogVO } from "../valueObjects/products/productCatalog.vo.js";
import { ProductQuantityVO } from "../valueObjects/products/productQuantity.vo.js";
import { ProductInventoryVO } from "../valueObjects/products/productInventory.vo.js";
import { ProductVO } from "../valueObjects/products/product.vo.js";

export const getCatalogService = async () => {
    const [ rows ] = await getCatalogModel()

    if (!rows || !Array.isArray(rows)) return [];
    
    if (!rows || !Array.isArray(rows)) return [];
    
    
    return rows.map(dbProduct => new ProductCatalogVO(dbProduct));
}

export const getProductQuantityService = async (id) => {
    const product = await getProductQuantityModel(id);
    
    if (!product) {
        throw new Error('Product not found');
    }
    
    return new ProductQuantityVO(product);
}

export const getInventoryService = async () => {
    const products = await getInventoryModel();
    
    return products.map(product => new ProductInventoryVO(product));
}


export const createProductService = async (category_id, unit_id, name, perishable, min_stock, max_stock) => {
    const [ result ] = await createProductModel(category_id, unit_id, name, perishable, min_stock, max_stock)

    if (!result || !result.insertId) return { success: false, message: "Product could not be created" };

    const newProduct = new ProductVO({
        category_id,
        unit_id,
        name,
        perishable,
        min_stock,
        max_stock,
    });

    return { success: true, message: "Product created successfully", product: newProduct };
}

export const deleteProductService = async (id) => {
    const [ result ] = await deleteProductModel(id)

    if (!result || !result.affectedRows) return { success: false, message: "Product could not be deleted" };
    

    return { success: true, message: "Product deleted successfully" };
}
