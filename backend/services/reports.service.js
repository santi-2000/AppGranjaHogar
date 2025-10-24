/**
 * @module services/reports
 * 
 * @description This module defines the ReportsService class which handles the business logic for generating reports.
 *              It interacts with the ReportsModel to fetch data and generate PDF and XLSX reports.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * import { reportsService } from '../services/reports.service.js';
 * const pdfDoc = await reportsService.postReportPDFService({doc, userId, initialDate, endDate, type});
 */


import ExcelJS from "exceljs"
import { reportsModel } from "../models/reports.model.js";
import { ProductReportVO } from "../valueObjects/reports/productReport.vo.js";
import { ProductEntrieReportVO } from "../valueObjects/reports/productEntrieReport.vo.js";
import { ProductOutReportVO } from "../valueObjects/reports/productOutReport.vo.js";
import { notificationService } from "./notifications.service.js";

class ReportsService {
    /**
   * Populates a PDFDocument with report data based on the selected types.
   * 
   * @async
   * @param {PDFKit.PDFDocument} doc - An instance of a PDFKit document to write into.
   * @param {number} userId - ID of the user generating the report.
   * @param {string} initialDate - Start date of the report (in ISO 8601 format).
   * @param {string} endDate - End date of the report (in ISO 8601 format).
   * @param {number[]} type - Array of report sections to include:
   *   - 1: Inventory
   *   - 2: Product Entries
   *   - 3: Product Outs
   * 
   * @returns {Promise<void>}
   */
    async postReportPDFService({ doc, userId, initialDate, endDate, type }) {

        doc.image('assets/logos/main-logo.png', 50, 30, { width: 95 })

        doc.fontSize(24).font('Helvetica-Bold').text('Reporte', { align: 'center' });
        doc.fontSize(15).text(`Granja Hogar`, { align: 'center' });
        doc.moveDown(1);

        doc.fontSize(12).font('Helvetica-Bold').text(`Desde: ${initialDate}`, { align: 'left' });
        doc.fontSize(12).font('Helvetica-Bold').text(`Hasta: ${endDate}`, { align: 'left' });

        if (type.includes(1)) {
            doc.moveDown(2);
            doc.fontSize(13).font('Helvetica-Bold').text(`Inventario Actual`, { align: 'left' });
            doc.fontSize(11).font('Helvetica')
            doc.moveDown(1);
            const [productsRows] = await reportsModel.postReportInventory();
            if (!productsRows || !Array.isArray(productsRows)) return [];

            const validatedProducts = productsRows.map(dbProduct => new ProductReportVO(dbProduct));

            const inventory = [["Nombre", "Categoria", "Perecedero", "Unidad", "Stock Actual", "Stock Min", "Stock Max", "Creado", "Actualizado"]]

            validatedProducts.forEach(product => {
                inventory.push([
                    product.name,
                    product.category,
                    product.perishable ? "Si" : "No",
                    product.unit, product.actual_stock,
                    product.min_stock,
                    product.max_stock,
                    product.getFormattedCreatedAt(),
                    product.getFormattedUpdatedAt()]);
            });

            doc.table({
                rowStyles: (i) => {
                    return i < 1
                        ? { border: [0, 0, 2, 0], borderColor: "black" }
                        : { border: [0, 0, 1, 0], borderColor: "#aaa" };
                },
                data: inventory
            });
        }

        if (type.includes(2)) {
            doc.moveDown(2);
            doc.fontSize(13).font('Helvetica-Bold').text(`Entradas`, { align: 'left' });
            doc.fontSize(11).font('Helvetica')
            doc.moveDown(1);
            const [entriesRows] = await reportsModel.postReportEntries(initialDate, endDate);
            if (!entriesRows || !Array.isArray(entriesRows)) return [];

            const validatedEntries = entriesRows.map(dbEntry => new ProductEntrieReportVO(dbEntry));

            const inventory = [
                ["Nombre", "Usuario", "¿Donación?", "Unidad", "Cantidad", "Fecha de Vencimiento", "Creado"]
            ]

            validatedEntries.forEach(entry => {
                inventory.push([
                    entry.productName,
                    entry.user,
                    entry.isDonation ? "Si" : "No",
                    entry.unit,
                    entry.quantity,
                    entry.getFormattedExpDate(),
                    entry.getFormattedCreatedAt()]);
            });

            doc.table({
                rowStyles: (i) => {
                    return i < 1
                        ? { border: [0, 0, 2, 0], borderColor: "black" }
                        : { border: [0, 0, 1, 0], borderColor: "#aaa" };
                },
                data: inventory
            });
        }

        if (type.includes(3)) {
            doc.moveDown(2);
            doc.fontSize(13).font('Helvetica-Bold').text(`Salidas`, { align: 'left' });
            doc.fontSize(11).font('Helvetica')
            doc.moveDown(1);
            const [outsRows] = await reportsModel.postReportOuts(initialDate, endDate);
            if (!outsRows || !Array.isArray(outsRows)) return [];

            const validatedOuts = outsRows.map(dbOut => new ProductOutReportVO(dbOut));

            const inventory = [
                ["Nombre", "Usuario", "Motivo", "Departamento", "Unidad", "Cantidad", "Notas", "Creado"]
            ]

            validatedOuts.forEach(out => {
                inventory.push([
                    out.productName,
                    out.userName,
                    out.reason,
                    out.departmentName,
                    out.unit,
                    out.quantity,
                    out.notes,
                    out.getFormattedCreatedAt()]);
            });

            doc.table({
                rowStyles: (i) => {
                    return i < 1
                        ? { border: [0, 0, 2, 0], borderColor: "black" }
                        : { border: [0, 0, 1, 0], borderColor: "#aaa" };
                },
                data: inventory
            });
        }

        const [report] = await reportsModel.postReport(userId, initialDate, endDate);


        if (type.includes(1)) await reportsModel.postReportInclude(report.insertId, 1);
        if (type.includes(2)) await reportsModel.postReportInclude(report.insertId, 2);
        if (type.includes(3)) await reportsModel.postReportInclude(report.insertId, 3);

        await notificationService.addNotification({
            user_id: userId,
            content: `Nuevo reporte pdf entre fechas: ${initialDate} - ${endDate}`,
            type_id: 13,
            permission_id: 4
        });

        return doc;
    }

    /**
   * Generates an Excel report (XLSX) with specified sections.
   *
   * @async
   * @param {number} userId - ID of the user requesting the report.
   * @param {string} initialDate - Start date of the report (in ISO 8601 format).
   * @param {string} endDate - End date of the report (in ISO 8601 format).
   * @param {number[]} type - Array of report sections to include:
   *   - 1: Inventory
   *   - 2: Product Entries
   *   - 3: Product Outs
   * 
   * @returns {Promise<ExcelJS.Workbook>} - The generated Excel workbook instance.
   */
    async postReportXLSXService({ userId, initialDate, endDate, type }) {
        const workbook = new ExcelJS.Workbook();

        if (type.includes(1)) {
            const worksheet = workbook.addWorksheet('Inventario');

            worksheet.columns = [
                { header: 'Nombre', key: 'name', width: 30 },
                { header: 'Categoria', key: 'category', width: 30 },
                { header: 'Perecedero', key: 'date', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
                { header: 'Unidad', key: 'amount', width: 15, style: { numFmt: '"$"#,##0.00' } },
                { header: 'Stock Actual', key: 'actual', width: 15, style: { numFmt: '"$"#,##0.00' } },
                { header: 'Stock Min', key: 'min', width: 15, style: { numFmt: '"$"#,##0.00' } },
                { header: 'Stock Max', key: 'max', width: 15, style: { numFmt: '"$"#,##0.00' } },
                { header: 'Creado', key: 'createdAt', width: 20, style: { numFmt: 'dd/mm/yyyy HH:mm' } },
                { header: 'Actualizado', key: 'updatedAt', width: 20, style: { numFmt: 'dd/mm/yyyy HH:mm' } }
            ];

            const [productsRows] = await reportsModel.postReportInventory();
            if (!productsRows || !Array.isArray(productsRows)) return [];

            const validatedProducts = productsRows.map(dbProduct => new ProductReportVO(dbProduct));

            let inventory = []

            validatedProducts.forEach(product => {
                inventory.push({
                    name: product.name,
                    category: product.category,
                    perishable: product.perishable ? "Si" : "No",
                    unit: product.unit,
                    actual: product.actual_stock,
                    min: product.min_stock,
                    max: product.max_stock,
                    createdAt: product.getFormattedCreatedAt(),
                    updatedAt: product.getFormattedUpdatedAt()
                });
            });

            worksheet.addRows(inventory);

            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF008000' }
            };
        }

        if (type.includes(2)) {
            const worksheet = workbook.addWorksheet('Entradas');

            worksheet.columns = [
                { header: 'Nombre', key: 'productName', width: 30 },
                { header: 'Usuario', key: 'user', width: 30 },
                { header: '¿Donación?', key: 'isDonation', width: 15 },
                { header: 'Unidad', key: 'unit', width: 15 },
                { header: 'Cantidad', key: 'quantity', width: 15 },
                { header: 'Fecha de Vencimiento', key: 'expDate', width: 20, style: { numFmt: 'dd/mm/yyyy HH:mm' } },
                { header: 'Creado', key: 'createdAt', width: 20, style: { numFmt: 'dd/mm/yyyy HH:mm' } }
            ];

            const [entriesRows] = await reportsModel.postReportEntries(initialDate, endDate);
            if (!entriesRows || !Array.isArray(entriesRows)) return [];

            const validatedEntries = entriesRows.map(dbEntry => new ProductEntrieReportVO(dbEntry));

            const inventory = []

            validatedEntries.forEach(entry => {
                inventory.push({
                    productName: entry.productName,
                    user: entry.user,
                    isDonation: entry.isDonation ? "Si" : "No",
                    unit: entry.unit,
                    quantity: entry.quantity,
                    expDate: entry.getFormattedExpDate(),
                    createdAt: entry.getFormattedCreatedAt()
                });
            });

            worksheet.addRows(inventory);

            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF008000' }
            };
        }

        if (type.includes(3)) {
            const worksheet = workbook.addWorksheet('Salidas');

            worksheet.columns = [
                { header: 'Nombre', key: 'productName', width: 30 },
                { header: 'Usuario', key: 'userName', width: 30 },
                { header: 'Motivo', key: 'reason', width: 20 },
                { header: 'Departamento', key: 'departmentName', width: 20 },
                { header: 'Unidad', key: 'unit', width: 15 },
                { header: 'Cantidad', key: 'quantity', width: 15 },
                { header: 'Notas', key: 'notes', width: 30 },
                { header: 'Creado', key: 'createdAt', width: 20, style: { numFmt: 'dd/mm/yyyy HH:mm' } }
            ];

            const [outsRows] = await reportsModel.postReportOuts(initialDate, endDate);
            if (!outsRows || !Array.isArray(outsRows)) return [];

            const validatedOuts = outsRows.map(dbOut => new ProductOutReportVO(dbOut));

            const inventory = []

            validatedOuts.forEach(out => {
                inventory.push({
                    productName: out.productName,
                    userName: out.userName,
                    reason: out.reason,
                    departmentName: out.departmentName,
                    unit: out.unit,
                    quantity: out.quantity,
                    notes: out.notes,
                    createdAt: out.getFormattedCreatedAt()
                });
            });

            worksheet.addRows(inventory);

            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF008000' }
            };
        }


        const [report] = await reportsModel.postReport(userId, initialDate, endDate);


        if (type.includes(1)) await reportsModel.postReportInclude(report.insertId, 1);
        if (type.includes(2)) await reportsModel.postReportInclude(report.insertId, 2);
        if (type.includes(3)) await reportsModel.postReportInclude(report.insertId, 3);

        await notificationService.addNotification({
            user_id: userId,
            content: `Nuevo reporte de excel entre fechas: ${initialDate} - ${endDate}`,
            type_id: 13,
            permission_id: 4
        });

        return workbook
    }
}

export const reportsService = new ReportsService();