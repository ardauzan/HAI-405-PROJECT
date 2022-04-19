/* eslint-disable no-console */

const path = require("path")
const express = require("express")
const api = require("./api")
const fse = require("fs-extra")

const app = express()
let port = 5000

try {
	if (!fse.existsSync("public/config.json")) {
		throw "config missing"
	}
} catch {
	fse.copyFile("public/config-default.json", "public/config.json", 0, () => {})
	fse.removeSync("public/images", () => {})
	fse.copySync("public/images-default", "public/images", { overwrite: true }, () => {})
} finally {
	app.use("/", (req, res, next) => {
		console.table({ host: req.headers.host, url: req.url, method: req.method })
		next()
	})

	app.use("/api", api)

	app.use(express.static(path.join(__dirname, "../../client", "build")))
	app.use(express.static("public"))
	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, "../../client", "build", "index.html"))
	})

	app.listen(port, () => {
		console.clear()
		console.log(`Server started on < port: ${port} >`)
	})
}
