/**
 * @module models/reports
 * @description This module defines the ReportsModel class which handles database operations
 *              related to reports, including retrieval and creation.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @example
 * import { reportsModel } from '../models/reports.model.js';
 * const report = await reportsModel.postReport(userId, initialDate, endDate);
 */

import db from "../models/index.js"

class ReportsModel {
    /**
   * @description Fetches the full inventory of products.
   * @returns {Promise<any>} A promise resolving to the list of products.
   */

    async postReportInventory() {
        return await db.query('SELECT * FROM products');
    }

    /**
   * @description Inserts a new report record into the database.
   *
   * @async
   * @param {number} userId - ID of the user creating the report.
   * @param {string} initialDate - The starting date of the report period (ISO 8601 format).
   * @param {string} endDate - The ending date of the report period (ISO 8601 format).
   * @returns {Promise<any>} A promise resolving to the result of the insert operation.
   */
    async postReport(userId, initialDate, endDate) {
        const sql = `
        INSERT INTO reports (user_id, initial_date, end_date) VALUES (?, ?, ?);
        `
        return await db.query(sql, [userId, initialDate, endDate]);
    }

    /**
   * Inserts a record into the report_includes table to associate
   * a report with an included item.
   *
   * @async
   * @param {number} reportId - The ID of the report.
   * @param {number} includeId - The ID of the included item.
   * @returns {Promise<any>} A promise resolving to the result of the insert operation.
   */
    async postReportInclude(reportId, includeId) {
        const sql = `
        INSERT INTO report_includes (report_id, include_id) VALUES (?, ?);
        `
        return await db.query(sql, [reportId, includeId]);
    }

    /**
   * Retrieves product outs within a given date range.
   *
   * @async
   * @param {string} initialDate - The starting date of the range (ISO 8601 format).
   * @param {string} endDate - The ending date of the range (ISO 8601 format).
   * @returns {Promise<any>} A promise resolving to the list of product outs.
   */
    async postReportOuts(initialDate, endDate) {
        const sql = `
        SELECT ou.quantity, ou.notes, ou.created_at, p.name AS productName, u.name AS unit, CONCAT(us.name, ' ', us.last_name) AS userName, r.name AS reason, d.name AS departmentName
        FROM product_outs AS ou
        JOIN users AS us ON ou.user_id = us.id
        JOIN products AS p ON ou.product_id = p.id
        JOIN reasons AS r ON ou.reason_id = r.id
        JOIN departments AS d ON ou.department_id = d.id
        JOIN units AS u ON p.unit_id = u.id
        WHERE ou.created_at BETWEEN ? AND ?;
        `;
        return await db.query(sql, [initialDate, endDate]);
    }

    /**
   * Retrieves product entries within a date range.
   *
   * @async
   * @param {string} initialDate - The starting date of the range (ISO 8601 format).
   * @param {string} endDate - The ending date of the range (ISO 8601 format).
   * @returns {Promise<any>} A promise resolving to the list of product entries.
   */
    async postReportEntries(initialDate, endDate) {
        const sql = `
        SELECT en.is_donation, en.quantity, en.exp_date, en.created_at, p.name, u.name AS unit, CONCAT(us.name, ' ', us.last_name) AS user
        FROM product_entries AS en
        JOIN units AS u ON en.unit_id = u.id
        JOIN products AS p ON en.product_id = p.id
        JOIN users AS us ON en.user_id = us.id

        WHERE en.created_at BETWEEN ? AND ?;
        `;
        return await db.query(sql, [initialDate, endDate]);
    }
}

export const reportsModel = new ReportsModel();