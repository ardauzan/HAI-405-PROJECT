import { Helmet } from "react-helmet"
import { ErrorBoundary } from ".."
import styles from "./Home.module.sass"
const { main, h1, p } = styles
export default function Home() {
	return (
		<ErrorBoundary level='page'>
			<Helmet>
				<title>Who am I?</title>
				<meta name='description' content='Information about the game' />
			</Helmet>
			<main className={main}></main>
			<h1 className={h1}>Who am I? The game</h1>
			<p className={p}>description</p>
		</ErrorBoundary>
	)
}
