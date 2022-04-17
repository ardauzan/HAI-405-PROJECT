import { ErrorBoundary } from "../.."
import styles from "./PageNotFound.module.sass"

const { container, heading, description } = styles

export default function PageNotFound() {
	return (
		<ErrorBoundary level='fallback'>
			<main className={container}>
				<h1 className={heading}>404 | Page Not Found</h1>
				<p className={description}>Page you tried to visit does not exist exist.</p>
			</main>
		</ErrorBoundary>
	)
}
