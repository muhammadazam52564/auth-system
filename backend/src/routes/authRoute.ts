import { Request, Response } from "express"
const express           = require('express')
const authRoutes        = express.Router()

const authValidator     = require('../validation/authValidator')
const jwtVerifyMiddleware = require("../middlewares/jwtVerifyMiddleware")

const { 
    registerHandler,
    loginHandler,
    verifyToken
}  = require('../controllers/authController')

authRoutes.post('/login', authValidator('login'), loginHandler)
authRoutes.post('/register',authValidator('register'), registerHandler)
authRoutes.get('/verify', jwtVerifyMiddleware, verifyToken)

module.exports = authRoutes