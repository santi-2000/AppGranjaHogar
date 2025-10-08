import express from "express";
import session from 'express-session';
import mysql from 'mysql2/promise';
import ExpressMySQLSession from 'express-mysql-session';


import logsRouter from "./routes/logs.routes.js"
import notificationsRouter from "./routes/notifications.routes.js"
import productEntriesRouter from "./routes/productEntries.routes.js"
import productOutsRouter from "./routes/productOuts.routes.js"
import productsRouter from "./routes/products.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import usersRouter from "./routes/users.routes.js"

// 3. Crear el pool de conexiones y el almacén de sesiones
const connection = mysql.createPool(dbOptions);
const MySQLStore = ExpressMySQLSession(session); // Pasa el constructor de 'session'
const sessionStore = new MySQLStore({}, connection);

const app = express()

const dbOptions = {
    host: 'localhost',
    user: 'root', // Reemplaza con tu usuario
    password: 'tu_contraseña', // Reemplaza con tu contraseña
    database: 'nombre_de_tu_bd', // Reemplaza con el nombre de tu BD
    // Opcional: para asegurar que la tabla se cree correctamente
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};



app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); 

// 5. Usar el middleware de sesión
app.use(session({
    secret: 'un_secreto_muy_fuerte_y_largo_para_esm', // Clave para firmar la cookie
    resave: false, // No guardar si no hay cambios
    saveUninitialized: false, // No crear sesión hasta que se almacene algo
    store: sessionStore, // Usar el almacén de MySQL
    cookie: {
        secure: false, // Cambiar a 'true' en producción con HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día de vida
    }
}));

app.use("/v1/logs", logsRouter)
app.use("/v1/notifications", notificationsRouter)
app.use("/v1/productEntries", productEntriesRouter)
app.use("/v1/productOuts", productOutsRouter)
app.use("/v1/products", productsRouter)
app.use("/v1/reports", reportsRouter)
app.use("/v1/users", usersRouter)

export default app