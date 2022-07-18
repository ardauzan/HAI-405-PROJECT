/*eslint-disable no-console */
import axios from "axios"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import { internalServerErrorCaughtState, gameDataState, gameState, gameModeState } from "../../state"
import { _resetBackend } from "../../utils"
import styles from "./ChoseGameModeView.module.sass"
const { container, radiotoolbar, radio, startbtn, div2, radiolabel } = styles
export default function ChoseGameModeView() {
	const setGameData = useSetRecoilState(gameDataState)
	const setGame = useSetRecoilState(gameState)
	const gameMode = useRecoilValue(gameModeState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const getGameDataFromBackend = async () => {
		const data = await axios
			.get("config.json")
			.then(res => res.data)
			.catch(() => setInternalServerErrorCaught(true))
		if (!data.length) {
			_resetBackend(setInternalServerErrorCaught, setGameData)
		} else {
			setGameData(data)
			setGame(prev => [true, prev[1], Math.floor(Math.random() * data.length), prev[3]])
		}
	}
	const startGame = () => {
		getGameDataFromBackend()
		setGame(prev => [true, prev[1], prev[2], prev[3]])
	}
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<div className={radiotoolbar}>
					<div className={radio}>
						<label className={radiolabel} htmlFor='gme-0'>
							Single Player
						</label>
						<input
							name='gme'
							type='radio'
							id='gme-0'
							checked={gameMode === 0}
							onChange={() => setGame(prev => [false, 0, prev[2], prev[3]])}
						/>
					</div>

					<div className={radio}>
						<label className={radiolabel} htmlFor='gme-1'>
							Multi Player
						</label>
						<input
							name='gme'
							type='radio'
							id='gme-1'
							checked={gameMode === 1}
							onChange={() => setGame(prev => [false, 1, prev[2], prev[3]])}
						/>
					</div>
				</div>
				<div className={div2}>
					<button className={startbtn} onClick={startGame}>
						Start game
					</button>
				</div>
			</section>
		</ErrorBoundary>
	)
}
