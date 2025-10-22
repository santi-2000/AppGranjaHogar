/**
 * @module controllers/productOuts
 * @description
 * This module defines the 'ProductOutController' class, which handles HTTP requests related
 * to product outs. It interacts with the 'productOutService' to perform operations such as
 * retrieving all product outs, fetching one by ID, and creating new product out records.
 * @author Samuel Isaac Lopez Mar
 */

import { catchAsync } from "../middlewares/catchAsync.middleware.js";
import { productOutService } from "../services/productOuts.service.js";


/**
 * Controller responsible for managing product out operations.
 * @class
 */
export class ProductOutController {
  constructor() {
    this.getAll = catchAsync(this.getAll.bind(this));
    this.getById = catchAsync(this.getById.bind(this));
    this.create = catchAsync(this.create.bind(this));
  }

  /**
   * Retrieves all registered product outs.
   *
   * @async
   * @memberof ProductOutController
   * @param {import("express").Request} req - The HTTP request object.
   * @param {import("express").Response} res - The HTTP response object.
   * @returns {Promise<void>} Returns a list of product outs as JSON.
   * @example
   * // Request
   * GET /api/v1/product-outs
   * * // Response (200)
   * {
   * "success": true,
   * "data": [
   * {
   * "id": 3,
   * "user_id": 3,
   * "product_id": 1,
   * "reason_id": 2,
   * "department_id": 3,
   * "unit_id": 2,
   * "quantity": 3,
   * "notes": "Solicitud de residente",
   * "created_at": "2025-10-21T05:53:51.000Z"
   * },
   * // ... otros registros
   * ]
   * }
   */
  async getAll(req, res) {
    const result = await productOutService.getAll();
    res.status(200).json(result);
  }

  /**
   * Retrieves a specific product out by its ID.
   *
   * @async
   * @memberof ProductOutController
   * @param {import("express").Request} req - The HTTP request object, containing 'req.params.id'.
   * @param {import("express").Response} res - The HTTP response object.
   * @returns {Promise<void>} Returns a single product out as JSON.
   * @example
   * // Request
   * GET /api/v1/product-outs/10
   * * // Response (200)
   * {
   * "success": true,
   * "data": {
   * "id": 10,
   * "user_id": 2,
   * "product_id": 8,
   * "reason_id": 2,
   * "department_id": 1,
   * "unit_id": 4,
   * "quantity": 4,
   * "notes": "Limpieza general",
   * "created_at": "2025-10-21T06:10:12.000Z"
   * }
   * }
   */
  async getById(req, res) {
    const result = await productOutService.getById(req.params.id);
    res.status(200).json(result);
  }

  /**
   * Creates a new product out record.
   *
   * @async
   * @memberof ProductOutController
   * @param {import("express").Request} req - The HTTP request object containing product data in 'req.body'.
   * @param {import("express").Response} res - The HTTP response object.
   * @returns {Promise<void>} Returns an object with the ID of the newly created record and a confirmation message.
   * @example
   * // Request
   * POST /api/v1/product-outs
   * {
   * "user_id": 3,
   * "product_id": 12,
   * "reason_id": 2,
   * "department_id": 2,
   * "unit_id": 2,
   * "quantity": 6,
   * "notes": "Se acabó el arroz"
   * }
   * * // Response (201)
   * {
   * "success": true,
   * "insertId": 25,
   * "message": "Salida registrada correctamente"
   * }
   */
  async create(req, res) {
    const result = await productOutService.create(req.body);
    res.status(201).json(result)
  }
}

export const productOutController = new ProductOutController();