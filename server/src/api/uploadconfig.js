const express = require("express")
const uploadconfig = express.Router()

uploadconfig.get("/", (req, res, next) => {
	console.log(req.body)
	res.status(200).send("OK")
})

uploadconfig.put("/uploadConfig", undefined, (req, res, next) => res.json(200))

module.exports = uploadconfig
