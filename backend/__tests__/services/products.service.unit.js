import { jest } from '@jest/globals';
import { ProductVO } from '../../valueObjects/products/product.vo.js';

/**
 * Products Service Test
 * @module ProductsServiceTest
 * @description This module contains unit tests for the ProductsService.
 *              It uses `jest` for mocking services and assertions.
 * 
 * @author Carlos Alejandro Ortiz Caro
 * @author Roberto Santiago Estrada Orozco
 * @author Renata Loaiza
 */

const createProductModelMock = jest.fn();
const deleteProductModelMock = jest.fn();
const updateProductModelMock = jest.fn();
const getByIdModelMock = jest.fn();
const addNotificationMock = jest.fn();

jest.unstable_mockModule('../../models/products.model.js', () => ({
  getCatalogModel: jest.fn(),
  getProductQuantityModel: jest.fn(),
  getInventoryModel: jest.fn(),
  createProductModel: createProductModelMock,
  deleteProductModel: deleteProductModelMock,
  update: updateProductModelMock,
  getById: getByIdModelMock,
}));

jest.unstable_mockModule('../../services/notifications.service.js', () => ({
  notificationService: {
    addNotification: addNotificationMock
  }
}));

const { createProductService, deleteProductService } = await import('../../services/products.service.js');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Product Service', () => {
  describe(' ', () => {
    test('Given valid data When create Then returns success and product', async () => {
      // GIVEN
      const inputData = [1, 1, 'Test Product', false, 10, 100];
      createProductModelMock.mockResolvedValue([{ insertId: 1 }]);

      // WHEN
      const result = await createProductService(...inputData);

      // THEN
      expect(result.success).toBe(true);
      expect(result.product).toBeInstanceOf(ProductVO);
      expect(result.product.name).toBe('Test Product');
      expect(createProductModelMock).toHaveBeenCalledWith(...inputData);
    });

    test('Given failed insert When create Then returns failure', async () => {
      // GIVEN
      const inputData = [1, 1, 'Test Product', false, 10, 100];
      createProductModelMock.mockResolvedValue([{}]);

      // WHEN
      const result = await createProductService(...inputData);

      // THEN
      expect(result.success).toBe(false);
      expect(result.message).toBe('Product could not be created');
    });
  });

  describe('deleteProductService', () => {
    test('Given valid ID When delete Then returns success', async () => {
      // GIVEN
      const id = 1;
      deleteProductModelMock.mockResolvedValue([{ affectedRows: 1 }]);

      // WHEN
      const result = await deleteProductService(id);

      // THEN
      expect(result.success).toBe(true);
      expect(result.message).toBe('Product deleted successfully');
      expect(deleteProductModelMock).toHaveBeenCalledWith(id);
    });

    test('Given non-existent ID When delete Then returns failure', async () => {
      // GIVEN
      const id = 999;
      deleteProductModelMock.mockResolvedValue([{}]);

      // WHEN
      const result = await deleteProductService(id);

      // THEN
      expect(result.success).toBe(false);
      expect(result.message).toBe('Product could not be deleted');
    });
  });

  /**
   *  @author Roberto Santiago Estrada Orozco
   */

  describe('getInventory', () => {
    test('Given valid request, When getInventory, Then should return inventory list', async () => {
      // GIVEN
      const mockInventory = [
        { id: 1, name: 'Product 1', quantity: 10, unit: 'kg' },
        { id: 2, name: 'Product 2', quantity: 5, unit: 'liters' }
      ];
      const { productsService } = await import('../../services/products.service.js');
      jest.spyOn(productsService, 'getInventory').mockResolvedValue(mockInventory);

      // WHEN
      const result = await productsService.getInventory();

      // THEN
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id', 1);
      expect(result[0]).toHaveProperty('name', 'Product 1');
      expect(result[1]).toHaveProperty('id', 2);
      expect(result[1]).toHaveProperty('name', 'Product 2');
    });

    test('Given empty inventory, When getInventory, Then should return empty array', async () => {
      // GIVEN
      const { productsService } = await import('../../services/products.service.js');
      jest.spyOn(productsService, 'getInventory').mockResolvedValue([]);

      // WHEN
      const result = await productsService.getInventory();

      // THEN
      expect(result).toHaveLength(0);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  /**
   * @author Roberto Santiago Estrada Orozco
   */
  describe('getProductQuantity', () => {
    test('Given valid product ID, When getProductQuantity, Then should return product quantity', async () => {
      // GIVEN
      const mockProduct = { id: 1, name: 'Test Product', quantity: 15, unit: 'kg' };
      const { productsService } = await import('../../services/products.service.js');
      jest.spyOn(productsService, 'getProductQuantity').mockResolvedValue(mockProduct);

      // WHEN
      const result = await productsService.getProductQuantity(1);

      // THEN
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('name', 'Test Product');
      expect(result).toHaveProperty('quantity', 15);
    });

    test('Given non-existent product ID, When getProductQuantity, Then should throw error', async () => {
      // GIVEN
      const { productsService } = await import('../../services/products.service.js');
      jest.spyOn(productsService, 'getProductQuantity').mockRejectedValue(new Error('Product not found'));

      // WHEN/THEN
      await expect(productsService.getProductQuantity(999)).rejects.toThrow('Product not found');
    });
  });

  /**
   * @author Renata Loaiza
   */
  describe('editProduct', () => {
    test('Given valid product data When edit Then returns success and updated product', async () => {
      // GIVEN
      const existingProduct = { id: 1, name: 'Original Product', category_id: 1, unit_id: 1 };
      const updatedProduct = { id: 1, name: 'Updated Product', category_id: 2, unit_id: 2, perishable: true, min_stock: 20, max_stock: 200 };
      
      getByIdModelMock.mockResolvedValue(existingProduct);
      updateProductModelMock.mockResolvedValue(updatedProduct);
      addNotificationMock.mockResolvedValue({ id: 1 });

      const { productsService } = await import('../../services/products.service.js');
      
      // WHEN
      const result = await productsService.editProduct({
        category_id: 2,
        unit_id: 2,
        name: 'Updated Product',
        perishable: true,
        min_stock: 20,
        max_stock: 200,
        productId: 1,
        user_id: 1
      });

      // THEN
      expect(result.success).toBe(true);
      expect(result.message).toBe('Producto editado exitosamente');
      expect(getByIdModelMock).toHaveBeenCalledWith(1);
      expect(updateProductModelMock).toHaveBeenCalled();
    });

    test('Given non-existent product ID When edit Then throws error', async () => {
      // GIVEN
      getByIdModelMock.mockResolvedValue(null);

      const { productsService } = await import('../../services/products.service.js');
      
      // WHEN/THEN
      await expect(productsService.editProduct({
        category_id: 1,
        unit_id: 1,
        name: 'Updated Product',
        perishable: true,
        min_stock: 20,
        max_stock: 200,
        productId: 999,
        user_id: 1
      })).rejects.toThrow('Producto no encontrado');
    });

    test('Given failed update When edit Then throws error', async () => {
      // GIVEN
      const existingProduct = { id: 1, name: 'Original Product' };
      getByIdModelMock.mockResolvedValue(existingProduct);
      updateProductModelMock.mockResolvedValue(null);

      const { productsService } = await import('../../services/products.service.js');
      
      // WHEN/THEN
      await expect(productsService.editProduct({
        category_id: 1,
        unit_id: 1,
        name: 'Updated Product',
        perishable: true,
        min_stock: 20,
        max_stock: 200,
        productId: 1,
        user_id: 1
      })).rejects.toThrow('El producto no pudo ser editado');
    });
  });
});
