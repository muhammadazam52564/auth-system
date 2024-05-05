import { Request, Response } from "express"
import { validationResult } from "express-validator";
const jwt  = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const pool = require('../config/databaseConfig')
const msg  = require("../config/messages")

const jwtSign = (user: Object)=>{
    const SECRET = process.env.SECRET
    const OPTIONS = {
        expiresIn: '1h'
    }
    return  jwt.sign(user, SECRET, OPTIONS)
}


const registerHandler = async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).send({ errors: errors.array() });
    }
    try {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [req.body.email])
        console.log(result);
        if(result.rowCount){
            res.status(200).send({
                success: false,
                message: msg.EMAIL_TAKEN,
                data: null
            })
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const data = [req.body.user_type, req.body.full_name, req.body.email, hashedPassword, req.body.phone, req.body.address, req.body.country, req.body.bvn]
            const query =  "INSERT INTO users (user_type, full_name, email, password, phone, address, country, bvn) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
            pool.query(query, data, (err: any, result: any)=>{
                if(err){
                    console.log(err);
                    res.status(200).send({
                        success: false,
                        message: msg.UNKNOWN_ERROR,
                        data: null
                    })
                }else{
                    const record = result.rows[0]
                    const user = {
                        id: record.id,
                        user_type: record.user_type,
                        full_name: record.full_name,
                        email: record.email,
                        phone: record.phone,
                        address: record.address,
                        country: record.country,
                        bvn: record.bvn,
                        profile_picture: record.profile_picture
                    }
                    const token = jwtSign(user)
                    res.status(201).send({
                        success: true,
                        message: msg.USER_CREATED,
                        token: token,
                        data: user
                    })
                }
            })
        }
    } catch (error: any) {
        console.log(error.message);
    }
}

const loginHandler = async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send({ errors: errors.array() });
    }
    try {

        const password = req.body.password
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [req.body.email])
        // console.log(result);
        
        if(result.rowCount){
            const record = result.rows[0];
            const passwordCheck = await bcrypt.compare(password, record.password);
            if (passwordCheck){
                const user = {
                    id: record.id,
                    user_type: record.user_type,
                    full_name: record.full_name,
                    email: record.email,
                    phone: record.phone,
                    address: record.address,
                    country: record.country,
                    bvn: record.bvn,
                    profile_picture: record.profile_picture
                }
                const token = jwtSign(record)
                res.status(200).send({
                    success: true,
                    message: msg.LOGIN_SUCCESS,
                    token: token,
                    data: user
                })
            }else {
                res.status(200).send({
                    success: false,
                    message: msg.INVALID_CREDENTIALS,
                    data: null
                })
            }
        }else{
            res.status(200).send({
                success: false,
                message: msg.INVALID_CREDENTIALS,
                data: null
            })
        }
       
    } catch (error: any) {
        res.status(200).send({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const verifyToken = (req: Request, res: Response)=>{
    // Just for Authantication Middleware handle All Authentication 
}

module.exports = { registerHandler, loginHandler, verifyToken }