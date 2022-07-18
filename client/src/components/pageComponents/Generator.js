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
				<main className={main}>
					<h1>Generateur</h1>
					<p>description du generateur</p>
					{gameInSession ? (
						<button
							onClick={() => {
								setGame(prev => [false, prev[1], null, prev[3]])
							}}>
							Stop The game and interact with the generator
						</button>
					) : !filesSelected ? (
						<FileSelectionView />
					) : (
						<AttributeSelectionView />
					)}
				</main>
			</ErrorBoundary>
		)
	) : (
		<Navigate to='/' />
	)
}
