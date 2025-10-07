import db from "./index.js"

export const getCatalogModel = async () => {
    return await db.query('SELECT * FROM products');
}