import db from "../models/index.js"

export const ProductEditModel = async () => {
    const [ rows ] = await db.query('SELECT * FROM products');
    return rows;
}