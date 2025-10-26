import { reportsService } from "../../services/reports.service.js";
import { reportsModel } from "../../models/reports.model.js";
import { notificationService } from "../../services/notifications.service.js";
import ExcelJS from "exceljs";
import { ProductReportVO } from "../../valueObjects/reports/productReport.vo.js";
import { ProductEntrieReportVO } from "../../valueObjects/reports/productEntrieReport.vo.js";
import { ProductOutReportVO } from "../../valueObjects/reports/productOutReport.vo.js";

const MOCK_LARGE_ROWS = Array.from({ length: 5000 }, (_, i) => ({
  name: `Product ${i}`,
  perishable: i % 2,
  actual_stock: 100 + i
}));

const PERFORMANCE_THRESHOLD_MS = 500;
jest.mock("../../models/reports.model", () => ({
  reportsModel: {
    postReportInventory: jest.fn(),
    postReportEntries: jest.fn(),
    postReportOuts: jest.fn(),
    postReport: jest.fn(),
    postReportInclude: jest.fn(),
  },
}));

jest.mock("../../services/notifications.service", () => ({
  notificationService: {
    addNotification: jest.fn(),
  },
}));

jest.mock("../../valueObjects/reports/productReport.vo.js", () => ({
  ProductReportVO: jest.fn(data => ({
    ...data,
    getFormattedCreatedAt: jest.fn(() => "2023-01-01 10:00"),
    getFormattedUpdatedAt: jest.fn(() => "2023-01-05 15:30"),
    perishable: data.perishable || 0,
  })),
}));

jest.mock("../../valueObjects/reports/productEntrieReport.vo.js", () => ({
  ProductEntrieReportVO: jest.fn(data => ({
    ...data,
    getFormattedExpDate: jest.fn(() => "2024-12-31 00:00"),
    getFormattedCreatedAt: jest.fn(() => "2023-01-02 11:00"),
    isDonation: data.isDonation || 0,
  })),
}));

jest.mock("../../valueObjects/reports/productOutReport.vo.js", () => ({
  ProductOutReportVO: jest.fn(data => ({
    ...data,
    getFormattedCreatedAt: jest.fn(() => "2023-01-03 12:00"),
  })),
}));

const mockAddWorksheet = jest.fn().mockReturnThis();
const mockAddRows = jest.fn().mockReturnThis();
const mockGetRow = jest.fn(() => ({
  font: {
    set bold(val) { },
    set color(val) { },
  },
  fill: {
    set type(val) { },
    set pattern(val) { },
    set fgColor(val) { },
  },
}));

const MockWorkbook = {
  addWorksheet: jest.fn(() => ({
    columns: [],
    addRows: mockAddRows,
    getRow: mockGetRow,
  })),
};

jest.mock("exceljs", () => ({
  Workbook: jest.fn(() => MockWorkbook),
}));

const mockDoc = {
  image: jest.fn().mockReturnThis(),
  fontSize: jest.fn().mockReturnThis(),
  font: jest.fn().mockReturnThis(),
  text: jest.fn().mockReturnThis(),
  moveDown: jest.fn().mockReturnThis(),
  table: jest.fn().mockReturnThis(),
  end: jest.fn().mockReturnThis(),
};


const MOCK_USER_ID = 1;
const MOCK_INITIAL_DATE = "2023-01-01";
const MOCK_END_DATE = "2023-01-31";
const MOCK_REPORT_ID = 50;

const MOCK_INVENTORY_ROWS = [{ name: "Arroz", perishable: 0, actual_stock: 100 }, { name: "Huevos", perishable: 1, actual_stock: 50 }];
const MOCK_ENTRIES_ROWS = [{ productName: "Leche", isDonation: 1, quantity: 50 }, { productName: "Harina", isDonation: 0, quantity: 20 }];
const MOCK_OUTS_ROWS = [{ productName: "Jamon", userName: "User2", quantity: 5 }, { productName: "Queso", userName: "User3", quantity: 10 }];
const MOCK_REPORT_RESULT = { insertId: MOCK_REPORT_ID };


describe('ReportsService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Performance Tests', () => {

    test(`1. postReportPDFService debe ejecutarse en menos de ${PERFORMANCE_THRESHOLD_MS}ms con datos grandes`, async () => {
      const type = [1, 2, 3];
      reportsModel.postReportInventory.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReportEntries.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReportOuts.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      const startTime = performance.now();

      await reportsService.postReportPDFService({
        doc: mockDoc,
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
      expect(mockDoc.table).toHaveBeenCalledTimes(3);
      expect(reportsModel.postReportInclude).toHaveBeenCalledTimes(3);
    }, PERFORMANCE_THRESHOLD_MS + 100);

    test(`2. postReportXLSXService debe ejecutarse en menos de ${PERFORMANCE_THRESHOLD_MS}ms con datos grandes`, async () => {
      const type = [1, 2, 3];
      reportsModel.postReportInventory.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReportEntries.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReportOuts.mockResolvedValue([MOCK_LARGE_ROWS]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      const startTime = performance.now();

      await reportsService.postReportXLSXService({
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(PERFORMANCE_THRESHOLD_MS);
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledTimes(3);
      expect(reportsModel.postReportInclude).toHaveBeenCalledTimes(3);
    }, PERFORMANCE_THRESHOLD_MS + 100);

  });

  describe('postReportPDFService', () => {

    test('1. Debe generar un PDF con las 3 secciones (1, 2, 3) y notificar', async () => {
      const type = [1, 2, 3];
      reportsModel.postReportInventory.mockResolvedValue([MOCK_INVENTORY_ROWS]);
      reportsModel.postReportEntries.mockResolvedValue([MOCK_ENTRIES_ROWS]);
      reportsModel.postReportOuts.mockResolvedValue([MOCK_OUTS_ROWS]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      const resultDoc = await reportsService.postReportPDFService({
        doc: mockDoc,
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      expect(resultDoc).toBe(mockDoc);
      expect(mockDoc.table).toHaveBeenCalledTimes(3);
      expect(reportsModel.postReportInventory).toHaveBeenCalled();
      expect(reportsModel.postReportEntries).toHaveBeenCalled();
      expect(reportsModel.postReportOuts).toHaveBeenCalled();
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 1);
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 2);
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 3);
      expect(notificationService.addNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: MOCK_USER_ID,
          content: expect.stringContaining("pdf"),
        })
      );
    });

    test('2. Debe generar solo la sección de Entradas (2) y manejar datos vacíos en esa sección', async () => {
      const type = [2];
      reportsModel.postReportEntries.mockResolvedValue([[]]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      await reportsService.postReportPDFService({
        doc: mockDoc,
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      expect(reportsModel.postReportEntries).toHaveBeenCalledTimes(1);
      expect(reportsModel.postReportInventory).not.toHaveBeenCalled();
      expect(mockDoc.text).toHaveBeenCalledWith('Entradas', { align: 'left' });
      expect(mockDoc.table).toHaveBeenCalledTimes(1);
      expect(mockDoc.table.mock.calls[0][0].data.length).toBe(1);
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 2);
      expect(reportsModel.postReportInclude).toHaveBeenCalledTimes(1);
    });

  });

  describe('postReportXLSXService', () => {

    test('1. Debe generar un XLSX con las 3 hojas (1, 2, 3) y notificar', async () => {
      const type = [1, 2, 3];
      reportsModel.postReportInventory.mockResolvedValue([MOCK_INVENTORY_ROWS]);
      reportsModel.postReportEntries.mockResolvedValue([MOCK_ENTRIES_ROWS]);
      reportsModel.postReportOuts.mockResolvedValue([MOCK_OUTS_ROWS]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      const resultWorkbook = await reportsService.postReportXLSXService({
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      expect(resultWorkbook).toBe(MockWorkbook);
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledWith('Inventario');
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledWith('Entradas');
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledWith('Salidas');
      expect(mockAddRows).toHaveBeenCalledTimes(3);
      expect(reportsModel.postReportInclude).toHaveBeenCalledTimes(3);
      expect(notificationService.addNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: MOCK_USER_ID,
          content: expect.stringContaining("excel"),
        })
      );
    });

    test('2. Debe generar XLSX con Entradas (vacío) y Salidas (con datos)', async () => {
      const type = [2, 3];

      reportsModel.postReportEntries.mockResolvedValue([[]]);
      reportsModel.postReportOuts.mockResolvedValue([MOCK_OUTS_ROWS]);
      reportsModel.postReport.mockResolvedValue([MOCK_REPORT_RESULT]);

      const result = await reportsService.postReportXLSXService({
        userId: MOCK_USER_ID,
        initialDate: MOCK_INITIAL_DATE,
        endDate: MOCK_END_DATE,
        type
      });

      expect(result).toBe(MockWorkbook);

      expect(reportsModel.postReportEntries).toHaveBeenCalledTimes(1);
      expect(reportsModel.postReportOuts).toHaveBeenCalledTimes(1);

      expect(MockWorkbook.addWorksheet).toHaveBeenCalledWith('Entradas');
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledWith('Salidas');
      expect(MockWorkbook.addWorksheet).toHaveBeenCalledTimes(2);

      expect(mockAddRows).toHaveBeenCalledTimes(2);

      expect(reportsModel.postReport).toHaveBeenCalledTimes(1);
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 2);
      expect(reportsModel.postReportInclude).toHaveBeenCalledWith(MOCK_REPORT_ID, 3);
      expect(notificationService.addNotification).toHaveBeenCalledTimes(1);
    });

  });
});