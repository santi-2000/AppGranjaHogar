import db from "../models/index.js"

class ReportsModel {
    async postReportInventory() {
        return await db.query('SELECT * FROM products');
    }

    async postReport(userId, initialDate, endDate) {
        const sql = `
        INSERT INTO reports (user_id, initial_date, end_date) VALUES (?, ?, ?);
        `
        return await db.query(sql, [userId, initialDate, endDate]);
    }

    async postReportInclude(reportId, includeId) {
        const sql = `
        INSERT INTO report_includes (report_id, include_id) VALUES (?, ?);
        `
        return await db.query(sql, [reportId, includeId]);
    }

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