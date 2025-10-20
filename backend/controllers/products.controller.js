import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productService } from "../services/products.service.js";

class ProductsController {
    constructor() {
        this.getCatalog = catchAsync(this.getCatalog.bind(this));
        this.getProductQuantity = catchAsync(this.getProductQuantity.bind(this));
        this.getInventory = catchAsync(this.getInventory.bind(this));
        this.createProduct = catchAsync(this.createProduct.bind(this));
        this.deleteProduct = catchAsync(this.deleteProduct.bind(this));
        this.UpdateProduct = catchAsync(this.UpdateProduct.bind(this));
    }

    async getCatalog(req, res) {
        const result = await productsService.getCatalog();
        res.json(result);
    }

    async getProductQuantity(req, res) {
        const { id } = req.params;
        const result = await productService.getProductQuantity(id);
        res.json(result);
    }
    async getInventory(req, res) {
        const result = await productService.getInventory();
        res.json(result);
    }

    async createProduct(req, res) {
        const { category_id, unit_id, name, perishable, min_stock, max_stock } = req.body;
        const result = await productService.addProduct(category_id, unit_id, name, perishable, min_stock, max_stock);
        res.json(result);
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        const result = await productService.removeProduct(id);
        res.json(result);
    }

    async UpdateProduct (req, res) {
        const { id } = req.params;
        const updateData = req.body;
        const result = await productService.editProduct(updateData, id);
        res.json(result);
    }

}

export const productsController = new ProductsController();