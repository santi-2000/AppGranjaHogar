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
 */

const createProductModelMock = jest.fn();
const deleteProductModelMock = jest.fn();

jest.unstable_mockModule('../../models/products.model.js', () => ({
  getCatalogModel: jest.fn(),
  getProductQuantityModel: jest.fn(),
  getInventoryModel: jest.fn(),
  createProductModel: createProductModelMock,
  deleteProductModel: deleteProductModelMock,
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
});
