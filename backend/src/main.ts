import { Application } from "express"
const express = require('express')
require('dotenv').config()
const app: Application = express()
const PORT: number = Number(process.env.PORT) || 3000
const router = require('./routes')
app.use(express.json())
app.use("/api", router)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})