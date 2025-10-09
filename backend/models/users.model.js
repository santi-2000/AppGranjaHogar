import { getPool, sql } from "../database/mssql.js";

export const UsersModel = {
  async create({ name, last_name, passwordHash }) {
    const pool = await getPool();
    const res = await pool.request()
      .input("name", sql.NVarChar(120), String(name ?? "").trim())
      .input("last_name", sql.NVarChar(120), String(last_name ?? "").trim())
      .input("password", sql.VarChar(255), passwordHash)
      .query(`
        INSERT INTO [Users] (name, last_name, password)
        OUTPUT inserted.id, inserted.name, inserted.last_name
        VALUES (@name, @last_name, @password)
      `);
    return res.recordset[0]; // { id, name, last_name }
  }
};
