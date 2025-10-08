import db from "./index.js"

export const getCatalogModel = async () => {
    return await db.query('SELECT * FROM products');
}

export const getProductQuantityModel = async (id) => {
    const [rows] = await db.query('SELECT name, actual_stock, unit_id FROM products WHERE id = ?', [id]);
    return rows[0];
}
export const getInventoryModel = async () => {
    const [rows] = await db.query('SELECT id, name, actual_stock, unit_id FROM products ORDER BY name');
    return rows;
}