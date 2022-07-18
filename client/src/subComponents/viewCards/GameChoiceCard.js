/* eslint-disable no-console */
//import PropTypes from "prop-types"
import { ErrorBoundary } from "../../components"
import { useRecoilState } from "recoil"
import { gameState, currentQuestionState, allQuestionsState } from "../../state"
import { GameChoiceStack } from ".."
import styles from "./GameChoiceCard.module.sass"
const { container } = styles
export default function GameChoiceCard() {
	const [allQuestions, setAllQuestions] = useRecoilState(allQuestionsState)
	const [currentQuestion, setCurrentQuestion] = useRecoilState(currentQuestionState)
	const [game, setGame] = useRecoilState(gameState)
	const canNotValidate = () => {
		for (let i = 0; i < currentQuestion.length; i++) {
			if (
				i === 0
					? !currentQuestion[i][1] ||
					  (typeof currentQuestion[i][2] === "string" && !currentQuestion[i][2])
					: !currentQuestion[i][0] ||
					  !currentQuestion[i][1] ||
					  (typeof currentQuestion[i][2] === "string" && !currentQuestion[i][2])
			)
				return true
		}
		return !currentQuestion.length
	}
	return (
		<ErrorBoundary level='card'>
			<article className={container}>
				<GameChoiceStack />
				<button
					disabled={canNotValidate()}
					onClick={() => {
						let tmpArr = currentQuestion
						if (game[3]) {
							tmpArr[0][0] = "and"
						}
						setAllQuestions(prev => [...prev, ...tmpArr])
						setGame(prev => [prev[0], prev[1], prev[2], prev[3] + 1])
						setCurrentQuestion([])
					}}>
					valider
				</button>
				<button
					onClick={() =>
						console.log(
							"allQuestions",
							allQuestions,
							"currentQuestion",
							currentQuestion,
							"canNotValidate",
							canNotValidate()
						)
					}>
					logall
				</button>
			</article>
		</ErrorBoundary>
	)
}
