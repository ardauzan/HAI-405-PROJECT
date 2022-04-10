/* eslint-disable no-console */

const path = require("path")
const express = require("express")
const api = require("./api")

const app = express()

const port = 5000

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
