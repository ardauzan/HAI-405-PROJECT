const express = require("express")
const multer = require("multer")
const uploadimages = express.Router()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images")
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage })
uploadimages.get("/", (req, res, next) => {
	res.status(200).send("OK")
})
uploadimages.put("/", upload.array("image", 24), (req, res, next) => {
	console.log(req.body)
	res.status(200).send("OK")
})

module.exports = uploadimages
