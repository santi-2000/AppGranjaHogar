import express from "express";
import cors from "cors";

import notificationsRouter from "./routes/notifications.routes.js"
import productEntriesRouter from "./routes/productEntries.routes.js"
import productOutsRouter from "./routes/productOuts.routes.js"
import productsRouter from "./routes/products.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import usersRouter from "./routes/users.routes.js"
import permissionsRouter from "./routes/permissions.routes.js"
import reasonsRouter from "./routes/reasons.routes.js"
import unitsRouter from "./routes/units.routes.js"
import departmentsRouter from "./routes/departments.routes.js"

import morgan from "morgan";
import dotenv from 'dotenv';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { AppError } from "./utils/error.util.js";

dotenv.config();

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

app.use("/v1/departments", departmentsRouter)
app.use("/v1/notifications", notificationsRouter)
app.use("/v1/permissions", permissionsRouter)
app.use("/v1/product-entries", productEntriesRouter)
app.use("/v1/product-outs", productOutsRouter)
app.use("/v1/products", productsRouter)
app.use("/v1/reasons", reasonsRouter)
app.use("/v1/reports", reportsRouter)
app.use("/v1/users", usersRouter)
app.use("/v1/units", unitsRouter)

app.use((req, res, next) => {
  next(new AppError(`No se pudo encontrar ${req.originalUrl}`, 404));
});


app.use(errorHandler);

export default app