import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { fileDataState, internalServerErrorCaughtState } from "../../state"
import { ErrorBoundary } from "../../components"
import { FileSelectorCard } from "../"
import { _uploadImagesToBackend } from "../../utils"
import styles from "./FileSelectionView.module.sass"
const { container, heading } = styles
export default function FileSelectionView() {
	const [selectedImages, setSelectedImages] = useState([])
	const setFileData = useSetRecoilState(fileDataState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const selectedImagesLen = selectedImages.length
	const canNotUploadImagesToBackend = selectedImagesLen < 6 || selectedImagesLen > 24
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2 className={heading}>Sélection de fichiers</h2>
				<input type='file' accept='.png' onChange={e => setSelectedImages([...e.target.files])} multiple />
				<FileSelectorCard
					selectedImagesLen={selectedImagesLen}
					canNotUploadImagesToBackend={canNotUploadImagesToBackend}
				/>
				<button
					disabled={canNotUploadImagesToBackend}
					onClick={() =>
						_uploadImagesToBackend(selectedImages, setFileData, setInternalServerErrorCaught)
					}>
					Télécharger
				</button>
			</section>
		</ErrorBoundary>
	)
}
