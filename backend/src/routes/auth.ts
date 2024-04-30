import { Request, Response } from "express"

const express     = require('express')
const authRouter  = express.Router()


authRouter.get('/', (req: Request, res: Response)=>{
    res.send("My Home  router")
})

authRouter.post('/login', (req: Request, res: Response)=>{
    res.send("Login router")
})

authRouter.post('/register', (req: Request, res: Response)=>{
    res.send("register router")
})


module.exports = authRouter