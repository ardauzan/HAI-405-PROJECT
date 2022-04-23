/* eslint-disable no-console */
import PropTypes from "prop-types"
import { ErrorBoundary } from "../components"
import { allQuestionsState } from "../state"
import { useRecoilValue } from "recoil"
import { _parseAllQuestions } from "../utils"
import eliminated from "../cross.svg"

export default function GridCell({ vi }) {
	const [v, i] = vi
	const [imgAlt, imgSrc] = ["image-" + (i + 1), "images/image-" + (i + 1) + ".png"]
	const allQuestions = useRecoilValue(allQuestionsState)
	return (
		<ErrorBoundary level='cell'>
			<article>
				{_parseAllQuestions(v, allQuestions) ? <img alt='eliminated' src={eliminated} /> : null}
				<img alt={imgAlt} src={imgSrc} />
			</article>
		</ErrorBoundary>
	)
}
GridCell.propTypes = {
	vi: PropTypes.array.isRequired
}
