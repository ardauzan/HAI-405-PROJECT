const express = require("express")
const multer = require("multer")
const fse = require("fs-extra")
const uploadimages = express.Router()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
uploadimages.use((req, res, next) => {
	fse.removeSync("public/images", () => {})
	fse.mkdirSync("public/images")
	next()
})
const upload = multer({ storage: storage })
uploadimages.put("/", upload.array("image", 24), (req, res, next) => {
	res.status(200).send("OK")
})

module.exports = uploadimages
