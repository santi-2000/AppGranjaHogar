import express from "express";

const app = express()

app.use(express.json())

app.use("/", (req, res) =>{
    res.json({"jared":"Marquez"})
})

export default app