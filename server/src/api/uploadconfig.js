const express = require("express")
const fse = require("fs-extra")
const bodyParser = require("body-parser")
const uploadconfig = express.Router()
const jsonParser = bodyParser.json()
uploadconfig.get("/", (req, res, next) => {
	res.status(200).send("OK")
})
uploadconfig.put("/", jsonParser, (req, res, next) => {
	try {
		fse.writeFileSync("public/config.json", JSON.stringify(req.body))
		res.status(200).send("OK")
	} catch (e) {
		console.error(e) /* eslint-disable-line no-console */
		res.status(500).send("ERROR")
	}
})
module.exports = uploadconfig
