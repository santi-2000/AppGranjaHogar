import { jest } from '@jest/globals';
import { ProductVO } from '../../valueObjects/products/product.vo.js';

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
  describe('createProductService', () => {
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
});
