const express = require('express')
const router  = express.Router()

const authRouter = require('./authRoute')
router.use('/', authRouter)

module.exports = router