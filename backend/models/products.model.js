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

export const createProductModel = async (category_id, unit_id, name, perishable, min_stock, max_stock) => {
    const sql = 'INSERT INTO products (category_id, unit_id, name, perishable, min_stock, max_stock, actual_stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 0, NOW(), NOW())';
    return await db.query(sql, [category_id, unit_id, name, perishable, min_stock, max_stock]);
}

export const deleteProductModel = async (id) => {
    const sql = 'UPDATE products SET deleted_at = CURRENT_TIMESTAMP, is_active = FALSE WHERE id = ?';
    return await db.query(sql, [id]);
}  