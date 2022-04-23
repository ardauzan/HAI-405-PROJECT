const express = require("express")
const uploadconfig = require("./uploadconfig")
const uploadimages = require("./uploadimages")
<<<<<<< HEAD
const resetbackend = require("./resetbackend")
const port = 5000
=======
const port = 4000
>>>>>>> 14030a0d35a054b4c90fa3977a2a66355bcd746b
const api = express.Router()
api.use((req, res, next) => {
	req.headers.host === "localhost:" + port || req.headers.host === "127.0.0.1:" + port
		? next()
		: res.status(403).send("FORBIDDEN")
})
api.use("/uploadconfig", uploadconfig)
api.use("/uploadimages", uploadimages)
api.use("/resetbackend", resetbackend)
api.get("/", (req, res, next) => {
	res.status(200).send("OK")
})
module.exports = { api, port }
