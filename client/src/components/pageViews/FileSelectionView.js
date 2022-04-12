import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { fileDataState, internalServerErrorCaughtState } from "../../store"
import { ErrorBoundary } from "../baseComponents"
import { FileSelectionViewCards } from "../subComponents"
import { uploadImagesToBackend } from "../../utils"
import styles from "./FileSelectionView.module.sass"

const { FileSelectorCard } = FileSelectionViewCards
const { container, heading } = styles

export default function FileSelectionView() {
	const [selectedImages, setSelectedImages] = useState([])
	const setFileData = useSetRecoilState(fileDataState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	return (
		<ErrorBoundary type="view">
			<section className={container}>
				<h2 className={heading}>File Selection</h2>
				<input type="file" onChange={e => setSelectedImages([...e.target.files])} multiple />
				<FileSelectorCard selectedFileCount={selectedImages.length} />
				<button
					onClick={async () => {
						const res = await uploadImagesToBackend(selectedImages)
						return !(typeof res === "string") ? setFileData(res) : setInternalServerErrorCaught(true)
					}}
					disabled={selectedImages.length < 6 || selectedImages.length > 24}>
					Upload!
				</button>
			</section>
		</ErrorBoundary>
	)
}
