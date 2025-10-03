import express from "express";
import rolRoute from "./routes/roles.route.js"

const app = express()

app.use(express.json())
app.use("/v1/roles", rolRoute)


export default app