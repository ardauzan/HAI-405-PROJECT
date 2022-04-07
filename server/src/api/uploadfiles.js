const express = require("express")
const multer = require("multer")
const uploadfiles = express.Router()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage })

uploadfiles.put("/", upload.array("image", 24), (req, res, next) => {
	console.log(req.body)
	res.json(404)
})

module.exports = uploadfiles
