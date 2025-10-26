/**
 * @file Tests de ProductEntriesController (versión final ESM + mocks completos)
 * @description Pruebas unitarias del controlador de entradas de productos.
 * Mockea autenticación, express-validator y servicio para aislar la lógica del controlador.
 * Incluye caso exitoso, errores 400 y 404.
 * @author
 * Dania Sagarnaga Macías
 */

import { jest } from "@jest/globals";
import request from "supertest";


jest.unstable_mockModule("../../middlewares/auth.middleware.js", () => ({
  authMiddlewareLogged: (req, res, next) => {
    req.user = { id: 1, username: "tester" }; // simula usuario autenticado
    next();
  },
  authAuthorizePermissions: () => (req, res, next) => next(),
}));

jest.unstable_mockModule("express-validator", () => {
  const chainMock = () => {
    const middleware = (req, res, next) => next();

    const methods = [
      "notEmpty", "isInt", "isFloat", "isBoolean", "isString", "isArray",
      "isISO8601", "isEmail", "isLength", "isDate", "optional", "exists",
      "isUUID", "isMongoId", "isNumeric", "isAlpha", "isAlphanumeric",
      "isURL", "isJSON", "isObject", "isIn", "isLowercase", "isUppercase",

      "trim", "escape", "normalizeEmail", "toInt", "toFloat", "toBoolean",
      "toDate", "toLowerCase", "toUpperCase", "blacklist", "whitelist",

      "withMessage", "custom", "bail", "if", "equals", "matches"
    ];

    for (const method of methods) {
      middleware[method] = () => middleware;
    }

    return middleware;
  };

  return {
    body: chainMock,
    check: chainMock,
    param: chainMock,
    query: chainMock,
    validationResult: () => ({
      isEmpty: () => true,
      array: () => [],
    }),
  };
});

const mockCreate = jest.fn(async (data) => ({
  message: "Entrada creada correctamente",
  entry: {
    id: 1,
    product_id: data.product_id ?? 5,
    quantity: data.quantity ?? 10,
    unit_id: data.unit_id ?? 1,
    is_donation: data.is_donation ?? false,
    cost: data.cost ?? 200,
  },
  updated_stock: 50,
}));

const mockGetAll = jest.fn(async () => [
  { id: 1, product_id: 5, quantity: 10 },
  { id: 2, product_id: 7, quantity: 15 },
]);

const mockGetById = jest.fn(async (id) => ({ id, product_id: 5, quantity: 10 }));

jest.unstable_mockModule("../../services/productEntries.service.js", () => {
  console.log("✅ mockModule de productEntries.service.js cargado");
  return {
    productEntriesService: {
      create: mockCreate,
      getAll: mockGetAll,
      getById: mockGetById,
    },
  };
});


const { default: app } = await import("../../app.js");


jest.spyOn(console, "error").mockImplementation(() => {});


describe("ProductEntries Controller Tests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Given valid entry data When createEntry Then Status 201 and response with entry and updated stock", async () => {
    const res = await request(app)
      .post("/v1/product-entries/new")
      .send({
        product_id: 5,
        quantity: 10,
        unit_id: 1,
        is_donation: false,
        cost: 200,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Entrada creada correctamente");
    expect(res.body.data.entry.product_id).toBe(5);
    expect(res.body.data.updated_stock).toBe(50);
  });

  test("Given missing product_id When createEntry Then Error 400", async () => {
    const res = await request(app)
      .post("/v1/product-entries/new")
      .send({
        quantity: 10,
        unit_id: 1,
        is_donation: true,
      });

    expect(res.statusCode).toBe(400);
  });

  test("Given request to getAllEntries Then Status 200 and list of entries", async () => {
    const res = await request(app).get("/v1/product-entries");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("Given valid ID When getEntryById Then Status 200 and entry returned", async () => {
    const res = await request(app).get("/v1/product-entries/1");

    expect(res.statusCode).toBe(200);
    expect(Number(res.body.id)).toBe(1);
    expect(res.body.product_id).toBe(5);
  });

  test("Given invalid ID When getEntryById Then Status 404 and error message", async () => {
    mockGetById.mockImplementationOnce(() => {
      const error = new Error("Entrada no encontrada");
      error.statusCode = 404;
      throw error;
    });

    const res = await request(app).get("/v1/product-entries/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message || res.body.error).toContain("Entrada no encontrada");
  });
});