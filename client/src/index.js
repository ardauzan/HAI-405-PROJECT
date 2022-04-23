import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./global.css"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
reportWebVitals(console.info) /* eslint-disable-line no-console */
