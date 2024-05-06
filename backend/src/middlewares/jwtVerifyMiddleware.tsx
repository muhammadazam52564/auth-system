const msg = require("../config/messages")
const jwt  = require("jsonwebtoken")
import { NextFunction, Request, Response } from "express"
type userType = {
    id: number,
    user_type: number,
    full_name: string,
    email: string,
    phone: string,
    address: string,
    country: string,
    bvn: number,
    profile_picture: string
}

 const jwtVerifyMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    try {
        if(!req.headers.authorization){
            res.status(200).send({
                success: false,
                message: msg.UNAUTHORIZED_REQUEST,
                error: "no auth token",
                data: null
            })
        }
        else {
            const SECRET = process.env.SECRET
            jwt.verify(req.headers.authorization, SECRET, function(err: Error | null, user:userType ) {
                if(err){
                    res.status(200).send({
                        success: false,
                        message: msg.UNAUTHORIZED_REQUEST,
                        error: "invalid auth token",
                        data: null
                    })
                }else {
                    res.status(200).send({
                        success: true,
                        message: msg.SUCCESS,
                        data: user
                    })
                }
            });
        }
    } catch (error) {
        res.status(200).send({
            success: false,
            message: msg.UNAUTHORIZED_REQUEST,
            error: error,
            data: null
        })
    }
}
module.exports = jwtVerifyMiddleware



