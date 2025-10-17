import express from "express";
import session from "express-session";
import mysql from "mysql2/promise";
import ExpressMySqlSession from "express-mysql-session";
import cors from "cors";

import logsRouter from "./routes/logs.routes.js"
import notificationsRouter from "./routes/notifications.routes.js"
import productEditRouter from "./routes/productEdit.route.js"
import productEntriesRouter from "./routes/productEntries.routes.js"
import productOutsRouter from "./routes/productOuts.routes.js"
import productsRouter from "./routes/products.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import usersRouter from "./routes/users.routes.js"
import permissionsRouter from "./routes/permissions.routes.js"
import morgan from "morgan";

import dotenv from 'dotenv';

dotenv.config();

const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: {
        tableName: "sessions",
        columsNames: {
            session_id: "session_id",
            expires: "expires",
            data: "data"
        }
    }
};

const connection = mysql.createPool(dbOptions);
const mysqlStore = ExpressMySqlSession(session);
const sessionStore = new mysqlStore({}, connection);

const app = express()

app.use(morgan("dev"))
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);


app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(session({
    key: "token",
    secret: "kike123",
    store: sessionStore,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use("/v1/logs", logsRouter)
app.use("/v1/notifications", notificationsRouter)
app.use("/v1/productEdit", productEditRouter)
app.use("/v1/productEntries", productEntriesRouter)
app.use("/v1/productOuts", productOutsRouter)
app.use("/v1/products", productsRouter)
app.use("/v1/reports", reportsRouter)
app.use("/v1/users", usersRouter)
app.use("/v1/permissions", permissionsRouter)

export default app