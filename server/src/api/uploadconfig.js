const express = require("express")

const uploadconfig = express.Router()

uploadconfig.put("/uploadConfig", undefined, (req, res, next) => res.json(200))

module.exports = uploadconfig
