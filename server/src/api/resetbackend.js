const express = require("express")
const fse = require("fs-extra")
const resetbackend = express.Router()
resetbackend.get("/", (req, res, next) => {
	fse.removeSync("public/config.json", () => {})
	fse.removeSync("public/images", () => {})
	fse.copyFileSync("public/config-default.json", "public/config.json", 0, () => {})
	fse.copySync("public/images-default", "public/images", { overwrite: true }, () => {})
	res.status(200).send("OK")
})
module.exports = resetbackend
