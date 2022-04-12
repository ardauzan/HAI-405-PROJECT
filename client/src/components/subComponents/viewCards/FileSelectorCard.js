import PropTypes from "prop-types"
import styles from "./FileSelectorCard.module.sass"

const { container, heading, content, description } = styles

export default function FileSelectorCard({ selectedFileCount }) {
	return (
		<article className={container}>
			<h3 className={heading}>
				{selectedFileCount >= 6 && selectedFileCount <= 24 ? "Selection Details" : "Invalid selection"}
			</h3>
			<section className={content}>
				<p className={description}>
					{selectedFileCount >= 6 && selectedFileCount <= 24
						? `Amount of images chosen: ${selectedFileCount}`
						: "Choose image files to use. (At least 6, at most 24)"}
				</p>
			</section>
		</article>
	)
}

FileSelectorCard.propTypes = {
	selectedFileCount: PropTypes.number.isRequired
}
