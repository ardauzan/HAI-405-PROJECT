import { ErrorBoundary } from "../.."
import { Helmet } from "react-helmet"
import styles from "./PageNotFound.module.sass"
const { main, h1, p } = styles
export default function PageNotFound() {
	return (
		<ErrorBoundary level='fallback'>
			<Helmet>
				<title>Error | 404</title>
			</Helmet>
			<main className={main}>
				<h1 className={h1}>404 | Page Not Found</h1>
				<p className={p}>Page you tried to visit does not exist exist.</p>
			</main>
		</ErrorBoundary>
	)
}
