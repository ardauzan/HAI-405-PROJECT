import { ErrorBoundary } from "../../components"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { allQuestionsState, currentQuestionState, gameState, gameModeState } from "../../state"
import { GameGridCard, GameChoiceCard } from ".."
import styles from "./ChoseGameModeView.module.sass"
const { container } = styles
export default function SinglePlayerGameView() {
	const [allQuestions, setAllQuestions] = useRecoilState(allQuestionsState)
	const setCurrentQuestion = useSetRecoilState(currentQuestionState)
	const gameMode = useRecoilValue(gameModeState)
	const setGame = useSetRecoilState(gameState)
	const [heading] = !gameMode ? ["Single Player"] : ["Multi Player"]
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2>{heading}</h2>
				<h3>Tour:{allQuestions.length}</h3>
				<GameGridCard />
				<GameChoiceCard />
				<button
					onClick={() => {
						setGame(prev => [false, prev[1], null])
						setAllQuestions([])
						setCurrentQuestion([])
					}}>
					End Game
				</button>
			</section>
		</ErrorBoundary>
	)
}
