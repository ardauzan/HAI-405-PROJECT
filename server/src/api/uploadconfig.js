/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require("express")
const bodyParser = require("body-parser")
const uploadconfig = express.Router()

uploadconfig.put("/", bodyParser.json(), (req, res, next) => {
	console.log(req.body)
})

module.exports = uploadconfig
