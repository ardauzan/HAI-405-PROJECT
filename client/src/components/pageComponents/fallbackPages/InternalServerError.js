import { ErrorBoundary } from "../.."
import { Helmet } from "react-helmet"
import styles from "./InternalServerError.module.sass"
const { main, h1, p } = styles
export default function InternalServerError() {
	return (
		<ErrorBoundary level='fallback'>
			<Helmet>
				<title>Error | 500</title>
			</Helmet>
			<main className={main}>
				<h1 className={h1}>500 | Internal Server Error</h1>
				<p className={p}>Internal error occured on the backend.</p>
			</main>
		</ErrorBoundary>
	)
}
