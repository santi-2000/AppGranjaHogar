import request from 'supertest';
import { jest } from '@jest/globals';
import { ProductVO } from '../../valueObjects/products/product.vo.js';

/**
 * Products Controller Unit Test
 * @module ProductsControllerUnitTest
 * @description This module contains unit tests for the ProductsController.
 *              It uses `jest` and `supertest` for mocking services and testing HTTP endpoints.
 * 
 * @author Carlos Alejandro Ortiz Caro
 */

const productServiceMock = {
  createProductService: jest.fn(),
  deleteProductService: jest.fn(),
};

jest.unstable_mockModule('../../services/products.service.js', () => productServiceMock);

import app from '../../app.js';
const { createProductService, deleteProductService } = await import('../../services/products.service.js');

describe("Product Controller unit tests", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Create Product Endpoint Test', () => {
    test('Given product When create Then status 200', async () => {
      createProductService.mockResolvedValue({
        success: true,
        product: new ProductVO(1, 1, 1, 'Test Product', false, 10, 100),
      });

      await request(app)
        .post('/v1/products/create')
        .send({
          category_id: 1,
          unit_id: 1,
          name: 'Test Product',
          perishable: false,
          min_stock: 10,
          max_stock: 100,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.product.name).toBe('Test Product');
        });
    });

    test('Given product with invalid data When create Then error 400', async () => {
      await request(app)
        .post('/v1/products/create')
        .send({
          category_id: 'invalid',
          unit_id: 1,
          name: '',
          perishable: false,
          min_stock: -10,
          max_stock: 100,
        })
        .expect(400);
    });

    test('Given product with missing data When create Then error 400', async () => {
      await request(app)
        .post('/v1/products/create')
        .send({
          category_id: 1,
          name: 'Test Product',
          perishable: false,
          min_stock: 10,
          max_stock: 100,
        })
        .expect(400);
    });

  describe('Given product ID When delete Then status 200', () => {
    test('Should delete a product successfully', async () => {
      deleteProductService.mockResolvedValue({
        success: true,
        message: 'Product deleted successfully',
      });

      await request(app)
        .delete('/v1/products/delete/1')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Product deleted successfully');
        });
    });

    test('Given invalid product ID When delete Then error 400', async () => {
      await request(app)
        .delete('/v1/products/delete/invalid')
        .expect(400);
    });

    test('Given non-existent product ID When delete Then error 500', async () => {
      deleteProductService.mockResolvedValue({
        success: false,
        message: 'Product not found',
      });

      await request(app)
        .delete('/v1/products/delete/9999')
        .expect(500);
    });
  });
  });
});

