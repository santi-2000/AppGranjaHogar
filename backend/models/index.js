/**
 * @module models/index.js
 * 
 * @description
 * This module initializes a MySQL connection pool using the `mysql2/promise` library.
 * Connection details are loaded from environment variables using `dotenv`.
 * 
 * @example
 * import db from './models/index.js';
 * const [rows] = await db.query('SELECT * FROM products');
 *
 * @author Yahir Alfredo Tapia Sifuentes
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool