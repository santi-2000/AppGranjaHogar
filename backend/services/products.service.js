import db from "../models/index.js"
import { getCatalogModel, getProductQuantityModel, getInventoryModel } from "../models/products.model.js";
import { ProductCatalogVO } from "../valueObjects/products/ProductCatalog.vo.js";
import { ProductQuantityVO } from "../valueObjects/products/ProductQuantity.vo.js";
import { ProductInventoryVO } from "../valueObjects/products/ProductInventory.vo.js";

export const getCatalogService = async () => {
    const [ rows ] = await getCatalogModel()

    if (!rows || !Array.isArray(rows)) {
        return [];
    }
    
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
