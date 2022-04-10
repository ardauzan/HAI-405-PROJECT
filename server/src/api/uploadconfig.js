const express = require("express")
const uploadconfig = express.Router()

uploadconfig.get("/", (req, res, next) => {
	res.status(200).send("OK")
})

uploadconfig.put("/", undefined, (req, res, next) => {
	res.status(200).send("OK")
})

module.exports = uploadconfig
