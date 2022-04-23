/* eslint-disable no-console */
//import PropTypes from "prop-types"
import { ErrorBoundary } from "../../components"
import { useRecoilState } from "recoil"
import { currentQuestionState, allQuestionsState } from "../../state"
import { GameChoiceStack } from ".."
import styles from "./GameChoiceCard.module.sass"
const { container } = styles
export default function GameChoiceCard() {
	const [allQuestions, setAllQuestions] = useRecoilState(allQuestionsState)
	const [currentQuestion, setCurrentQuestion] = useRecoilState(currentQuestionState)
	const canNotValidate = () => {
		for (let i = 0; i < currentQuestion.length; i++) {
			console.log(currentQuestion[i])
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
						setAllQuestions(prev => [...prev, currentQuestion])
						setCurrentQuestion([])
					}}>
					valider
				</button>
				<button onClick={() => console.log(allQuestions, currentQuestion, canNotValidate())}>log</button>
			</article>
		</ErrorBoundary>
	)
}