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

const { main, button } = styles
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
<<<<<<< HEAD
				<h1 className={h1}>Game</h1>
				<p className={p}>Game</p>
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
=======
				<button className={button} onClick={() => getFileData()}>
					Entrer
				</button>
				<button onClick={() => console.log(fileData)}>log</button>
>>>>>>> 14030a0d35a054b4c90fa3977a2a66355bcd746b
			</main>
		</ErrorBoundary>
	)
}
