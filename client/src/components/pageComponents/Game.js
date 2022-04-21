import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { Helmet } from "react-helmet"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import styles from "./Game.module.sass"
const { main, h1, p } = styles
export default function Game() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<ErrorBoundary level='page'>
			<Helmet>
				<title>Game</title>
				<meta name='description' content='The game' />
			</Helmet>
			<main className={main}>
				<h1 className={h1}>Game</h1>
				<p className={p}>Game</p>
			</main>
		</ErrorBoundary>
	) : (
		<Navigate to='/500' />
	)
}
