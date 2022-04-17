import PropTypes from "prop-types"
import { ErrorBoundary } from "../../components"
import { _renderFileSelectorText } from "../../logic"
import styles from "./FileSelectorCard.module.sass"

const { container, heading, content, description } = styles

export default function FileSelectorCard({ selectedFileCount }) {
	const [headingTxt, descriptionTxt] = _renderFileSelectorText(selectedFileCount)
	return (
		<ErrorBoundary level='card'>
			<article className={container}>
				<h3 className={heading}>{headingTxt}</h3>
				<section className={content}>
					<p className={description}>{descriptionTxt}</p>
				</section>
			</article>
		</ErrorBoundary>
	)
}

FileSelectorCard.propTypes = {
	selectedFileCount: PropTypes.number.isRequired
}
