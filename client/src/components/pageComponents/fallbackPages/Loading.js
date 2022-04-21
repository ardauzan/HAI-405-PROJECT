import { ErrorBoundary } from "../.."
import { Helmet } from "react-helmet"
import styles from "./Loading.module.sass"
const { main, h1, p } = styles
export default function Loading() {
	return (
		<ErrorBoundary level='fallback'>
			<Helmet>
				<title>Loading...</title>
			</Helmet>
			<main className={main}>
				<h1 className={h1}>Loading</h1>
				<p className={p}>This is taking longer than usual...</p>
			</main>
		</ErrorBoundary>
	)
}
