const express = require("express")
const uploadimages = require("./uploadimages")

const api = express.Router()

api.use("/uploadimages", uploadimages)

module.exports = api
