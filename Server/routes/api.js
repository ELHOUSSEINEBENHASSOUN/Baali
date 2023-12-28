const accountRoute = require("./accountRoute")
const express = require("express")
const apiRoute = express.Router()

apiRoute.use('/account', accountRoute)

module.exports = apiRoute; 