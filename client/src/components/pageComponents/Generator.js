import { useSetRecoilState, useRecoilValue } from "recoil"
import { Navigate } from "react-router-dom"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState, filesSelectedState, gameState, gameInSessionState } from "../../state"
import { _renderAsyncContent, _hostIsLocal } from "../../utils"
import { AttributeSelectionView, FileSelectionView } from "../../subComponents"
import styles from "./Generator.module.sass"
const { main } = styles
export default function Generator() {
	const setGame = useSetRecoilState(gameState)
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	const gameInSession = useRecoilValue(gameInSessionState)
	const filesSelected = useRecoilValue(filesSelectedState)
	return _hostIsLocal() ? (
		_renderAsyncContent(
			internalServerErrorCaught,
			<ErrorBoundary level='page'>
<<<<<<< HEAD
				<main className={main}>
					<h1 className={h1}>Generateur</h1>
					<p className={p}>description du generateur</p>
					{gameInSession ? (
						<button
							onClick={() => {
								setGame(prev => [false, prev[1], null])
							}}>
							Stop The game and interact with the generator
						</button>
					) : !filesSelected ? (
						<FileSelectionView />
					) : (
						<AttributeSelectionView />
					)}
				</main>
=======
				<Helmet>
					<title>Generator</title>
					<meta name='description' content='Generator for the game' />
				</Helmet>
				<main className={main}>{!filesSelected ? <FileSelectionView /> : <AttributeSelectionView />}</main>
>>>>>>> 14030a0d35a054b4c90fa3977a2a66355bcd746b
			</ErrorBoundary>
		)
	) : (
		<Navigate to='/' />
	)
}
