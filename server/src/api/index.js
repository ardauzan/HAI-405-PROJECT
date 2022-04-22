const express = require("express")
const uploadconfig = require("./uploadconfig")
const uploadimages = require("./uploadimages")
const port = 4000
const api = express.Router()
api.use((req, res, next) => {
	if (req.headers.host === "localhost:" + port || req.headers.host === "127.0.0.1:" + port) next()
	else res.status(403).send("FORBIDDEN")
})
api.use("/uploadconfig", uploadconfig)
api.use("/uploadimages", uploadimages)
api.get("/", (req, res, next) => {
	res.status(200).send("OK")
})
module.exports = { api, port }
