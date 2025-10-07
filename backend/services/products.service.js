import { CatalogVO } from "../valueObjects/products.vo.js"
import db from "../models/index.js"
import { getCatalogModel } from "../models/products.model.js";

export const getCatalogService = async () => {
    const [ rows ] = await getCatalogModel()
    const catalog = new CatalogVO([ rows ]);

    return catalog;
}