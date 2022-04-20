import PropTypes from "prop-types"
import { ErrorBoundary } from "../../components"
import styles from "./FileSelectorCard.module.sass"
const { container, heading, content, description } = styles
export default function FileSelectorCard({ selectedImagesLen, canNotUploadImagesToBackend }) {
	const [headingTxt, descriptionTxt] = !canNotUploadImagesToBackend
		? ["Selection Details", `Amount of images chosen: ${selectedImagesLen}`]
		: ["Invalid selection", "Choose image files to use. (At least 6, at most 24)"]
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
	selectedImagesLen: PropTypes.number.isRequired,
	canNotUploadImagesToBackend: PropTypes.bool.isRequired
}
