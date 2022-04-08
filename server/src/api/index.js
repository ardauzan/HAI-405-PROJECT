const express = require("express")
const uploadimages = require("./uploadimages")

const api = express.Router()

api.get("/", (req, res, next) => {
	res.json(200)
})

api.use("/uploadimages", uploadimages)

module.exports = api
