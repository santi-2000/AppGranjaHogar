import db from "../models/index.js"

export const postReportInventoryModel = async () => {
    return await db.query('SELECT * FROM products');
}


export const postReportOutsModel = async (initialDate, endDate) => {
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

export const postReportEntriesModel = async (initialDate, endDate) => {
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