import db from "../models/index.js"
import { getCatalogModel } from "../models/products.model.js";
import { ProductCatalogVO } from "../valueObjects/products/ProductCatalog.vo.js";

export const getCatalogService = async () => {
    const [ rows ] = await getCatalogModel()

    if (!rows || !Array.isArray(rows)) {
        return [];
    }
    
    return rows.map(dbProduct => new ProductCatalogVO(dbProduct));
}