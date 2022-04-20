const express = require("express")
const uploadconfig = require("./uploadconfig")
const uploadimages = require("./uploadimages")
const api = express.Router()
api.use("/uploadconfig", uploadconfig)
api.use("/uploadimages", uploadimages)
api.get("/", (req, res, next) => {
	res.status(200).send("OK")
})
module.exports = api
