import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./global.css"
// info get element with id #root from the page and create a react root
const container = document.getElementById("root")
const root = createRoot(container)
// info render the app to the root
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
// info monitor performance
reportWebVitals(console.info) /* eslint-disable-line no-console */
