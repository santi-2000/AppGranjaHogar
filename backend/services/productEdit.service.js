import { UsersModel } from "../models/users.model";  
import { ProductVO } from "../valueObjects/products/product.vo";

export const ProductEditService = async ({ category_id, unit_id, name, perishable, min_stock, max_stock, actual_stock, is_active})