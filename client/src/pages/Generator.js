import { useState } from "react"
import { generatorViews } from "../components"
import styles from "./Game.module.sass"

const { AttributeSelectionView, FileSelectionView } = generatorViews
const { container, heading } = styles

export default function Generator() {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [filesChosen, setFilesChosen] = useState(false)

	return (
		<main className={container}>
			<h1 className={heading}>Generator</h1>
			{!filesChosen ? (
				<FileSelectionView
					selectedFiles={selectedFiles}
					setSelectedFiles={setSelectedFiles}
					setFilesChosen={setFilesChosen}
				/>
			) : (
				<AttributeSelectionView
					selectedFiles={selectedFiles}
					setSelectedFiles={setSelectedFiles}
					setFilesChosen={setFilesChosen}
				/>
			)}
		</main>
	)
}
