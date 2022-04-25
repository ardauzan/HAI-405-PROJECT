/* eslint-disable no-console */
import PropTypes from "prop-types"
import { ErrorBoundary } from "../components"
import { allQuestionsState } from "../state"
import { useRecoilValue } from "recoil"
import { _parseQuestions } from "../utils"
import eliminated from "../cross.png"
import styles from "./GridCell.module.sass"
const { cross, defimg, container, testgrid } = styles
export default function GridCell({ vi: [v, i] }) {
	const [imgAlt, imgSrc] = ["image-" + (i + 1), "images/image-" + (i + 1) + ".png"]
	const allQuestions = useRecoilValue(allQuestionsState)
	return (
		<ErrorBoundary level='cell'>
			<article className={container}>
				<div className={testgrid}>
					<div className={cross}>
						<img alt='eliminated' src={eliminated} />
					</div>

					<div className={defimg}>
						<img alt={imgAlt} src={imgSrc} />
					</div>
				</div>
			</article>
			<button
				onClick={() => {
					console.log("allQuestions", allQuestions)
					console.log(allQuestions, _parseQuestions(v, allQuestions))
				}}>
				log_parseQuestions
			</button>
		</ErrorBoundary>
	)
}
GridCell.propTypes = {
	vi: PropTypes.array.isRequired
}
