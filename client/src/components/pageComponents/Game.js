import { useRecoilValue } from "recoil"
import { Helmet } from "react-helmet"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import { _renderAsyncContent } from "../../utils"

import styles from "./Game.module.sass"
const { main, h1, p } = styles
export default function Game() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return _renderAsyncContent(
		internalServerErrorCaught,
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
	)
}
