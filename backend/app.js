import express from "express";

import logsRouter from "./routes/logs.routes.js"
import notificationsRouter from "./routes/notifications.routes.js"
import productEntriesRouter from "./routes/productEntries.routes.js"
import productOutsRouter from "./routes/productOuts.routes.js"
import productsRouter from "./routes/products.routes.js"
import reportsRouter from "./routes/reports.routes.js"
import usersRouter from "./routes/users.routes.js"

const app = express()

app.use(express.json())

app.use("/v1/logs", logsRouter)
app.use("/v1/notifications", notificationsRouter)
app.use("/v1/productEntries", productEntriesRouter)
app.use("/v1/productOuts", productOutsRouter)
app.use("/v1/products", productsRouter)
app.use("/v1/reports", reportsRouter)
app.use("/v1/users", usersRouter)

export default app