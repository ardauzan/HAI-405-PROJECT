/* eslint-disable no-console */
const express = require("express")
const fse = require("fs-extra")
const path = require("path")
const { api, port } = require("./api")
const app = express()
try {
	if (!fse.existsSync("public/config.json")) throw "config missing"
} catch {
	fse.copyFileSync("public/config-default.json", "public/config.json", 0, () => {})
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
