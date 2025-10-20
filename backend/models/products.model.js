import db from "./index.js"

export const getCatalogModel = async () => {
    const sql = `
    SELECT products.id, products.name, categories.name AS category, units.name AS unit, products.perishable, products.min_stock, products.max_stock, products.actual_stock
    FROM products AS products
    JOIN categories AS categories ON products.category_id = categories.id
    JOIN units AS units ON products.unit_id = units.id
    WHERE is_active = ?
    `;
    return await db.query(sql, [true]);
}

export const getProductQuantityModel = async (id) => {
    const [rows] = await db.query(`SELECT name, actual_stock, unit_id FROM products WHERE id = ? AND is_active = ?`, [id, true]);
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