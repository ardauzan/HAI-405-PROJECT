const path = require("path")
const express = require("express")
var morgan = require("morgan")
const api = require("./api")
const app = express()

let devMode = true
const port =
	typeof process.argv[2] === "number" && process.argv[2] !== 3000
		? (() => {
				devMode = false
				return process.argv[2]
		  })()
		: 3000

if (devMode) {
	app.use(
		morgan(":method :url :status :res[content-length] - :response-time ms")
	)
} else {
	app.use(express.static(path.join(__dirname, "../../client", "build")))
	app.use((req, res, next) => {
		res.sendFile(path.join(__dirname, "../../client", "build", "index.html"))
	})
}

app.use(express.static("public"))
app.use("/api", api)

app.listen(port, () => {
	console.log(`Server started on < port: ${port}, devMode: ${devMode} >`)
})
