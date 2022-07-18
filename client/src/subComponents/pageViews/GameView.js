import { ErrorBoundary } from "../../components"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { allQuestionsState, currentQuestionState, gameState, gameModeState } from "../../state"
import { GameGridCard, GameChoiceCard } from ".."
import styles from "./ChoseGameModeView.module.sass"
const { container } = styles
export default function SinglePlayerGameView() {
	const setAllQuestions = useSetRecoilState(allQuestionsState)
	const setCurrentQuestion = useSetRecoilState(currentQuestionState)
	const gameMode = useRecoilValue(gameModeState)
	const [game, setGame] = useRecoilState(gameState)
	const [heading] = !gameMode ? ["Single Player"] : ["Multi Player"]
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2>{heading}</h2>
				<h3>Tour:{game[3]}</h3>
				<GameGridCard />
				<GameChoiceCard />
				<button
					onClick={() => {
						setGame(prev => [false, prev[1], null, 0])
						setAllQuestions([])
						setCurrentQuestion([])
					}}>
					End Game
				</button>
			</section>
		</ErrorBoundary>
	)
}
