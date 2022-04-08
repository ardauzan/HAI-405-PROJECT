import PropTypes from "prop-types"
import { uploadImagesToBackend } from "../../utils"

export default function FileSelectionView({
	selectedFiles,
	setSelectedFiles,
	setFilesChosen
}) {
	const renderContent = () =>
		selectedFiles.length >= 6 && selectedFiles.length <= 24 ? (
			<>
				<h2>Selection Details:</h2>
				<p>Amount of images chosen: {selectedFiles.length}</p>
			</>
		) : (
			<>
				<h2>Invalid selection</h2>
				<p>Choose image files to use. (At least 6, at most 24)</p>
			</>
		)

	return (
		<>
			<div></div>
			<h3>First select image files to upload.</h3>
			<div>
				<input
					type="file"
					onChange={(e) => setSelectedFiles([...e.target.files])}
					multiple
				/>
				{renderContent()}
			</div>
			<button
				onClick={() => uploadImagesToBackend(selectedFiles, setFilesChosen)}
				disabled={selectedFiles.length < 6 || selectedFiles.length > 24}
			>
				Upload!
			</button>
		</>
	)
}

FileSelectionView.propTypes = {
	selectedFiles: PropTypes.array.isRequired,
	setSelectedFiles: PropTypes.func.isRequired,
	setFilesChosen: PropTypes.func.isRequired
}
