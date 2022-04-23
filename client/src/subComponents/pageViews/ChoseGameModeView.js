import axios from "axios"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import { internalServerErrorCaughtState, gameDataState, gameState, gameModeState } from "../../state"
import { _resetBackend } from "../../utils"
import styles from "./ChoseGameModeView.module.sass"
const { container } = styles
export default function ChoseGameModeView() {
	const [gameData, setGameData] = useRecoilState(gameDataState)
	const setGame = useSetRecoilState(gameState)
	const gameMode = useRecoilValue(gameModeState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const getGameDataFromBackend = async () => {
		const data = await axios
			.get("config.json")
			.then(res => res.data)
			.catch(() => setInternalServerErrorCaught(true))
		return data.length === 0 ? _resetBackend(setInternalServerErrorCaught, setGameData) : setGameData(data)
	}
	const startGame = () => {
		getGameDataFromBackend()
		setGame(prev => [true, prev[1], Math.floor(Math.random() * gameData.length)])
	}
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<button onClick={() => startGame()}>Start game</button>
				<label htmlFor='gme-0'>Single Player</label>
				<input
					name='gme'
					type='radio'
					id='gme-0'
					checked={gameMode === 0}
					onChange={() => setGame(prev => [prev[0], 0, prev[2]])}
				/>
				<label htmlFor='gme-1'>Multi Player</label>
				<input
					name='gme'
					type='radio'
					id='gme-1'
					checked={gameMode === 1}
					onChange={() => setGame(prev => [prev[0], 1, prev[2]])}
				/>
			</section>
		</ErrorBoundary>
	)
}
