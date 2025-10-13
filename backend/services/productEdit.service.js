import { ProductEditModel } from "../models/productEdit.model";  
import { ProductVO } from "../valueObjects/products/product.vo";

export const ProductEditService = async ({ category_id, unit_id, name, perishable, min_stock, max_stock, actual_stock, is_active}, productId) => {
    try {
        // Validate that the product exists
        const existingProduct = await ProductEditModel.getById(productId);
        if (!existingProduct) {
            throw { code: "BAD_INPUT", message: "Producto no encontrado" };
        }

        // Update the product
        const updatedProduct = await ProductEditModel.update(productId, {
            category_id,
            unit_id,
            name,
            perishable,
            min_stock,
            max_stock,
            actual_stock,
            is_active
        });

        // Return the updated product as a value object
        return new ProductVO(updatedProduct);
    } catch (error) {
        throw error;
    }
}