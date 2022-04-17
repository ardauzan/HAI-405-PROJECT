import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { fileDataState, internalServerErrorCaughtState } from "../../state"
import { ErrorBoundary } from "../../components"
import { FileSelectorCard } from "../"
import { _setSelectedImages, _canNotUploadImagesToBackend, _uploadImagesToBackend } from "../../logic"
import styles from "./FileSelectionView.module.sass"

const { container, heading } = styles

export default function FileSelectionView() {
	const [selectedImages, setSelectedImages] = useState([])
	const setFileData = useSetRecoilState(fileDataState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const selImLen = selectedImages.length
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2 className={heading}>File Selection</h2>
				<input type='file' onChange={e => _setSelectedImages(e, setSelectedImages)} multiple />
				<FileSelectorCard selectedFileCount={selImLen} />
				<button
					disabled={_canNotUploadImagesToBackend()}
					onClick={() =>
						_uploadImagesToBackend(selectedImages, setFileData, setInternalServerErrorCaught)
					}>
					Upload!
				</button>
			</section>
		</ErrorBoundary>
	)
}
