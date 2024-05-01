import { body } from "express-validator";

const authValidator =  (key: String) => {
    switch (key) {
        case 'login':{
            return [
                body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Please Provide an Email")
                    .isEmail()
                    .withMessage("Please provide a valid Email"),
                body("password")
                    .notEmpty()
                    .withMessage("Please provide password")
                    .trim().isLength({ min: 6 })
                    .withMessage("Please provide at least 6 characters"),
            ]
        }
        case 'register': {
            return [
                body("user_type")
                    .isInt()
                    .notEmpty()
                    .withMessage("Please select user type")
                    .custom((input)=>{
                        if(![1,2].includes(Number(input))) {
                            throw "Please select a number either 1 or 2"
                        }
                        return true;
                    }),
                body("full_name")
                    .trim()
                    .notEmpty()
                    .withMessage("Please Provide your name")
                    .isLength({ min:3 })
                    .withMessage("Please Provide at least 3 charectors"),
                body("email")
                    .trim()
                    .notEmpty()
                    .withMessage("Please Provide an Email")
                    .isEmail()
                    .withMessage("Please provide a valid Email"),
                body("password")
                    .trim()
                    .notEmpty()
                    .withMessage("Please provide password")
                    .isLength({ min: 6 })
                    .withMessage("Please provide at least 6 characters"),
                body("phone")
                    .notEmpty()
                    .withMessage("Please provide phone number"),
                body("address")
                    .notEmpty()
                    .withMessage("Please provide your address")
                    .trim().isLength({ max: 255 })
                    .withMessage("Please provide maximum  255 characters"),
                body("country")
                    .trim()
                    .notEmpty()
                    .withMessage("Please provide your country"),
                body("bvn")
                    .trim()
                    .notEmpty()
                    .withMessage("Please provide BVN")
                    .isLength({ min: 11 })
                    .withMessage("Please provide at least 11 characters"),
            ]
        }
        default:
            break;
    }
}

module.exports = authValidator