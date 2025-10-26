import { productEntriesService } from "../../services/productEntries.service.js";
import { productEntriesModel } from "../../models/productEntries.model.js";
import { productsModel } from "../../models/products.model.js";
import { notificationsModel } from "../../models/notifications.model.js";
import { ProductEntryVO } from "../../valueObjects/products/productEntries.vo.js";
import { getUnitNameById } from "../../utils/units.util.js";

jest.mock("../../models/productEntries.model.js");
jest.mock("../../models/products.model.js");
jest.mock("../../models/notifications.model.js");
jest.mock("../../valueObjects/products/productEntries.vo.js");
jest.mock("../../utils/units.util.js");

describe("ProductEntriesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a product entry and update stock successfully", async () => {
      // Mock data
      const entryData = {
        product_id: 1,
        quantity: 10,
        user_id: 1,
        reason_id: 1,
        expiration_date: "2024-12-31"
      };

      const product = {
        id: 1,
        name: "Test Product",
        is_active: true,
        actual_stock: 5,
        unit_id: 1
      };

      const createdEntryId = 1;
      const expectedNewStock = product.actual_stock + entryData.quantity;

      ProductEntryVO.mockImplementation(() => entryData);
      productsModel.getById.mockResolvedValue(product);
      productEntriesModel.create.mockResolvedValue(createdEntryId);
      getUnitNameById.mockReturnValue("units");

      const result = await productEntriesService.create(entryData);

      expect(productsModel.getById).toHaveBeenCalledWith(entryData.product_id);
      expect(productEntriesModel.create).toHaveBeenCalledWith(entryData);
      expect(productsModel.update).toHaveBeenCalledWith(entryData.product_id, {
        actual_stock: expectedNewStock
      });
      expect(notificationsModel.createNotification).toHaveBeenCalled();
      expect(result).toEqual({
        message: `Entrada creada por el usuario ${entryData.user_id} y stock actualizado correctamente`,
        entry: { id: createdEntryId, ...entryData },
        updated_stock: expectedNewStock
      });
    });

    it("should throw error if product is not found", async () => {
      const entryData = { product_id: 999 };
      ProductEntryVO.mockImplementation(() => entryData);
      productsModel.getById.mockResolvedValue(null);

      await expect(productEntriesService.create(entryData))
        .rejects
        .toThrow("Producto no encontrado");
    });

    it("should throw error if product is not active", async () => {
      const entryData = { product_id: 1 };
      const inactiveProduct = { id: 1, is_active: false };
      
      ProductEntryVO.mockImplementation(() => entryData);
      productsModel.getById.mockResolvedValue(inactiveProduct);

      await expect(productEntriesService.create(entryData))
        .rejects
        .toThrow("El producto no está activo");
    });
  });

  describe("getAll", () => {
    it("should return all product entries", async () => {
      const mockEntries = [
        { id: 1, product_id: 1, quantity: 10 },
        { id: 2, product_id: 2, quantity: 20 }
      ];

      productEntriesModel.getAll.mockResolvedValue(mockEntries);

      const result = await productEntriesService.getAll();

      expect(productEntriesModel.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockEntries);
    });
  });

  describe("getById", () => {
    it("should return a product entry by id", async () => {
      const mockEntry = { id: 1, product_id: 1, quantity: 10 };
      productEntriesModel.getById.mockResolvedValue(mockEntry);

      const result = await productEntriesService.getById(1);

      expect(productEntriesModel.getById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEntry);
    });

    it("should throw error if entry is not found", async () => {
      productEntriesModel.getById.mockResolvedValue(null);

      await expect(productEntriesService.getById(999))
        .rejects
        .toThrow("Entrada no encontrada");
    });
  });
});