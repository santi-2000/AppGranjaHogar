/**
 * @file Tests de ProductOutsController (ESM + mocks completos)
 * @description Pruebas unitarias del controlador de salidas de productos.
 * Mockea autenticación, express-validator y servicio para aislar la lógica del controlador.
 * Incluye caso exitoso, errores 400 y 404.
 * @author
 * Samuel Isaac López Mar
 */

import { jest } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("../../middlewares/auth.middleware.js", () => ({
  authMiddlewareLogged: (req, res, next) => {
    req.user = { id: 3, username: "tester" };
    next();
  },
  authAuthorizePermissions: () => (req, res, next) => next(),
}));

jest.unstable_mockModule("express-validator", () => {
  const chainMock = () => {
    const middleware = (req, res, next) => next();
    const methods = [
      "notEmpty","isInt","isFloat","isBoolean","isString","isArray",
      "isISO8601","isEmail","isLength","isDate","optional","exists",
      "trim","escape","toInt","toFloat","toBoolean","toDate",
      "withMessage","custom","bail","if","equals","matches"
    ];
    for (const m of methods) middleware[m] = () => middleware;
    return middleware;
  };
  return {
    body: chainMock,
    check: chainMock,
    param: chainMock,
    query: chainMock,
    validationResult: () => ({ isEmpty: () => true, array: () => [] }),
  };
});

const mockCreate = jest.fn(async () => ({
  success: true,
  updatedStock: true,
  insertId: 25,
  message: "Salida registrada correctamente",
}));

const mockGetAll = jest.fn(async () => [
  {
    id: 3, user_id: 3, product_id: 1, reason_id: 2,
    department_id: 3, unit_id: 2, quantity: 3,
    notes: "Solicitud de residente",
  },
]);

const mockGetById = jest.fn(async (id) => ({
  id: Number(id),
  user_id: 2,
  product_id: 8,
  reason_id: 2,
  department_id: 1,
  unit_id: 4,
  quantity: 4,
  notes: "Limpieza general",
}));

jest.unstable_mockModule("../../services/productOuts.service.js", () => ({
  productOutService: {
    create: mockCreate,
    getAll: mockGetAll,
    getById: mockGetById,
  },
}));

const { default: app } = await import("../../app.js");
jest.spyOn(console, "error").mockImplementation(() => {});

describe("ProductOuts Controller Tests", () => {
  afterAll(() => jest.clearAllMocks());

  test("Given valid out data When createOut Then 201 and success message", async () => {
    const res = await request(app)
      .post("/v1/product-outs")
      .send({
        user_id: 3,
        product_id: 12,
        reason_id: 2,
        department_id: 2,
        unit_id: 2,
        quantity: 6,
        notes: "Se acabó el arroz",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Salida registrada correctamente");
    expect(res.body.success).toBe(true);
    expect(res.body.updatedStock).toBe(true);
    expect(res.body.insertId).toBe(25);
  });

  test("Given missing product_id When createOut Then 400", async () => {
    const res = await request(app)
      .post("/v1/product-outs")
      .send({
        reason_id: 2,
        department_id: 2,
        quantity: 3,
      });

    expect(res.statusCode).toBe(400);
  });

  test("Given request to getAllOuts Then 200 and list of outs", async () => {
    const res = await request(app).get("/v1/product-outs");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].notes).toBe("Solicitud de residente");
  });

  test("Given valid ID When getOutById Then 200 and record returned", async () => {
    const res = await request(app).get("/v1/product-outs/10");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(10);
    expect(res.body.notes).toBe("Limpieza general");
  });

  test("Given invalid ID When getOutById Then 404 and error message", async () => {
    mockGetById.mockImplementationOnce(() => {
      const err = new Error("Salida no encontrada");
      err.statusCode = 404;
      throw err;
    });

    const res = await request(app).get("/v1/product-outs/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message || res.body.error).toContain("Salida no encontrada");
  });
});
