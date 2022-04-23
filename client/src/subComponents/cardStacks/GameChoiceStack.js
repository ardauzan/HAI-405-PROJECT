/* eslint-disable no-console */
import { ErrorBoundary } from "../../components"
import { GameChoiceFrame } from ".."
import { useRecoilState } from "recoil"
import { currentQuestionState } from "../../state"
export default function GameChoiceStack() {
	const [currentQuestion, setCurrentQuestion] = useRecoilState(currentQuestionState)
	return (
		<ErrorBoundary level='stack'>
			<h4>Question(s):</h4>
			{currentQuestion.map((v, i) => (
				<GameChoiceFrame i={i} key={i} />
			))}
			<button onClick={() => setCurrentQuestion(prev => [...prev, ["", "", undefined]])}>ajouter</button>
			<button disabled={!currentQuestion.length} onClick={() => setCurrentQuestion([])}>
				enlever
			</button>
		</ErrorBoundary>
	)
}
