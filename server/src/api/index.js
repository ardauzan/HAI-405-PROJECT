const express = require("express")
const uploadfiles = require("./uploadfiles")

const api = express.Router()

api.get("/", (req, res, next) => {
	res.json(200)
})

api.use("/uploadfiles", uploadfiles)

module.exports = api
