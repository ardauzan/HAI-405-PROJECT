import { useState } from "react"
import axios from "axios"
import { AttributeSelectionView, FileSelectionView } from "../components"
import { uploadImagesToBackend } from "../utils"

export default function Generator() {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [filesChosen, setFilesChosen] = useState(false)
	const [attributes, setAttributes] = useState([])
	const [attributesSelectedForThisImage, setAttributesSelectedForThisImage] =
		useState([])
	const [possibleAttributes, setPossibleAttributes] = useState([])
	const [addAttributeOpen, setAddAttributeOpen] = useState(false)

	return (
		<main className="generator">
			{filesChosen ? (
				<>
					<h3>Second, chose the attributes for the images.</h3>
					<div>
						<h4>Image {selectedFiles.length}</h4>
						<img
							alt={"image-" + selectedFiles.length}
							src={"images/image-" + selectedFiles.length + ".png"}
						/>
						<AttributeSelectionView
							possibleAttributes={possibleAttributes}
							setPossibleAttributes={setPossibleAttributes}
							attributesSelectedForThisImage={attributesSelectedForThisImage}
							setAttributesSelectedForThisImage={
								setAttributesSelectedForThisImage
							}
							addAttributeOpen={addAttributeOpen}
							setAddAttributeOpen={setAddAttributeOpen}
						/>
					</div>
					<button
						hidden={addAttributeOpen}
						disabled={attributesSelectedForThisImage.length < 1}
						onClick={() => {
							if (selectedFiles.length > 0) {
								setAttributes([
									...attributes,
									{
										image: selectedFiles.length,
										attributes: attributesSelectedForThisImage
									}
								])
								let tmpArr = selectedFiles
								tmpArr.pop()
								setSelectedFiles(tmpArr)
							} else {
								axios
									.put(
										"api/uploadconfig",
										JSON.stringify({ rows: 2, columns: 3, data: attributes })
									)
									.then(setFilesChosen(false))
							}
						}}
					>
						{selectedFiles.length > 0 ? "Next image!" : "Submit attributes"}
					</button>
					<button
						hidden={addAttributeOpen}
						onClick={() => {
							setSelectedFiles([])
							setFilesChosen(false)
							setAttributes([])
							setAttributesSelectedForThisImage([])
							setPossibleAttributes([])
						}}
					>
						Start-over!
					</button>
				</>
			) : (
				<>
					<h3>First select image files to upload.</h3>
					<div>
						<input
							type="file"
							onChange={(e) => setSelectedFiles([...e.target.files])}
							multiple
						/>
						<FileSelectionView selectedFiles={selectedFiles} />
					</div>
					<button
						onClick={() => uploadImagesToBackend(selectedFiles, setFilesChosen)}
						disabled={selectedFiles.length < 6 || selectedFiles.length > 24}
					>
						Upload!
					</button>
				</>
			)}
		</main>
	)
}
