import { Request, Response } from "express"
const express           = require('express')
const authValidator     = require('../validation/authValidator')
const authRoutes        = express.Router()
const { 
    registerHandler,
    loginHandler 
}                       = require('../controllers/authController')

authRoutes.post('/login', authValidator('login'), loginHandler)
authRoutes.post('/register',authValidator('register'), registerHandler)
module.exports = authRoutes