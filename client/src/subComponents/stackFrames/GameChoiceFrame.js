import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import { gameDataState, currentQuestionState } from "../../state"
import { useRecoilState } from "recoil"
import { _buildAllPossibleChoicesArray } from "../../utils"
export default function GameChoiceFrame({ i }) {
	const [currentQuestion, setCurrentQuestion] = useRecoilState(currentQuestionState)
	const gameData = useRecoilValue(gameDataState)
	const gameAllAttributes = _buildAllPossibleChoicesArray(gameData)
	return (
		<ErrorBoundary level='frame'>
			{i !== 0 ? (
				<select
					onChange={e =>
						setCurrentQuestion(prev => {
							let tmpArr = []
							for (let ii = 0; ii < currentQuestion.length; ii++) {
								if (i !== ii) tmpArr.push(prev[ii])
								else tmpArr.push([e.target.value, prev[ii][1], prev[ii][2]])
							}
							return tmpArr
						})
					}
					name='connector'
					id='connector'>
					<option value='' selected disabled hidden>
						Select
					</option>
					<option value='and'>And</option>
					<option value='or'>Or</option>
				</select>
			) : null}
			<select
				onChange={e =>
					setCurrentQuestion(prev => {
						let tmpArr = []
						for (let ii = 0; ii < currentQuestion.length; ii++) {
							if (i !== ii) tmpArr.push(prev[ii])
							else
								tmpArr.push([
									prev[ii][0],
									e.target.value,
									(() => {
										switch (gameAllAttributes[e.target.value].type) {
											case "string":
												return ""
											case "boolean":
												return false
											case "number":
												return 0
										}
									})()
								])
						}
						return tmpArr
					})
				}
				name='name'
				id='name'>
				<option value='' selected disabled hidden>
					Select
				</option>
				{Object.keys(gameAllAttributes).map((v, ii) => (
					<option value={v} key={ii}>
						{v}
					</option>
				))}
			</select>
			{gameAllAttributes[currentQuestion[i][1]] ? (
				gameAllAttributes[currentQuestion[i][1]].type === "string" ? (
					<select
						onChange={e =>
							setCurrentQuestion(prev => {
								let tmpArr = []
								for (let ii = 0; ii < currentQuestion.length; ii++) {
									if (i !== ii) tmpArr.push(prev[ii])
									else tmpArr.push([prev[ii][0], prev[ii][1], e.target.value])
								}
								return tmpArr
							})
						}
						name='value'
						id='value'>
						<option value='' selected disabled hidden>
							Select
						</option>
						{gameAllAttributes[currentQuestion[i][1]].possibilities.map((v, ii) => (
							<option value={v} key={ii}>
								{v}
							</option>
						))}
					</select>
				) : gameAllAttributes[currentQuestion[i][1]].type === "boolean" ? (
					<input
						onInput={() =>
							setCurrentQuestion(prev => {
								let tmpArr = []
								for (let ii = 0; ii < currentQuestion.length; ii++) {
									if (i !== ii) tmpArr.push(prev[ii])
									else tmpArr.push([prev[ii][0], prev[ii][1], !prev[ii][2]])
								}
								return tmpArr
							})
						}
						type='checkbox'
					/>
				) : (
					<input
						onInput={e =>
							setCurrentQuestion(prev => {
								let tmpArr = []
								for (let ii = 0; ii < currentQuestion.length; ii++) {
									if (i !== ii) tmpArr.push(prev[ii])
									else tmpArr.push([prev[ii][0], prev[ii][1], e.target.value])
								}
								return tmpArr
							})
						}
						type='number'
						min={0}
						defaultValue={0}
					/>
				)
			) : null}
		</ErrorBoundary>
	)
}
GameChoiceFrame.propTypes = {
	i: PropTypes.number.isRequired
}
