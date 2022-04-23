import { ErrorBoundary } from "../.."
import styles from "./Loading.module.sass"
const { main, h1, p } = styles
export default function Loading() {
	return (
		<ErrorBoundary level='fallback'>
			<main className={main}>
				<h1 className={h1}>Loading</h1>
				<p className={p}>This is taking longer than usual...</p>
			</main>
		</ErrorBoundary>
	)
}
