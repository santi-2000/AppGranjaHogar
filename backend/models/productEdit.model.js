import db from "../models/index.js"

export const ProductEditModel = {
    async getById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    async update(id, updateData) {
        const fields = [];
        const values = [];
        
        // Build dynamic update query
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });
        
        if (fields.length === 0) {
            throw new Error("No fields to update");
        }
        
        values.push(id);
        
        const query = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await db.query(query, values);
        
        if (result.affectedRows === 0) {
            throw new Error("Product not found or no changes made");
        }
        
        // Return the updated product
        return await this.getById(id);
    }
}