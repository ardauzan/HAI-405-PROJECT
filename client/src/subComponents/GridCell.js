/* eslint-disable no-console */
import PropTypes from "prop-types"
import { ErrorBoundary } from "../components"
import { allQuestionsState } from "../state"
import { useRecoilValue } from "recoil"
import { _parseAllQuestions } from "../utils"
import eliminated from "../cross.svg"
import styles from "./GridCell.module.sass"

const { cross, defimg, grid } = styles

export default function GridCell({ vi }) {
	const [v, i] = vi
	const [imgAlt, imgSrc] = ["image-" + (i + 1), "images/image-" + (i + 1) + ".png"]
	const allQuestions = useRecoilValue(allQuestionsState)
	return (
		<ErrorBoundary level='cell'>
			<article className={grid}>
				{_parseAllQuestions(v, allQuestions) ? (
					<img className={cross} alt='eliminated' src={eliminated} />
				) : null}
				<img className={defimg} alt={imgAlt} src={imgSrc} />
			</article>
		</ErrorBoundary>
	)
}
GridCell.propTypes = {
	vi: PropTypes.array.isRequired
}
