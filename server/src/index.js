const path = require("path")
const express = require("express")
const api = require("./api")

const app = express()
let devMode = true
const port =
	process.argv[2] !== "dev"
		? (() => {
				devMode = false
				return process.argv[2] || 5000
		  })()
		: 3000

if (devMode) {
	app.all("/", (req, res, next) => {
		console.log(req)
		next()
	})
}

app.use("/api", api)
app.use(express.static(path.join(__dirname, "../../client", "build")))
app.use(express.static("public"))
app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "../../client", "build", "index.html"))
})

app.listen(port, () => {
	console.log(`Server started on < port: ${port}, devMode: ${devMode} >`)
})
