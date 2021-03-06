import { useSetRecoilState, useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import {
	fileDataState,
	possibleAttributesState,
	//	internalServerErrorCaughtState,
	filesSelectedState,
	gameInSessionState
} from "../../state"
import { _renderAsyncContent } from "../../utils"
import { ChoseGameModeView, GameView } from "../../subComponents"
import styles from "./Game.module.sass"
const { main } = styles
export default function Game() {
	const setFileData = useSetRecoilState(fileDataState)
	const setPossibleAttributes = useSetRecoilState(possibleAttributesState)
	//	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	const filesSelected = useRecoilValue(filesSelectedState)
	const gameInSession = useRecoilValue(gameInSessionState)
	return _renderAsyncContent(
		false,
		<ErrorBoundary level='page'>
			<main className={main}>
				{filesSelected ? (
					<button
						onClick={() => {
							setFileData([])
							setPossibleAttributes([])
						}}>
						Reset The backend and interact with the game
					</button>
				) : !gameInSession ? (
					<ChoseGameModeView />
				) : (
					<GameView />
				)}
			</main>
		</ErrorBoundary>
	)
}
