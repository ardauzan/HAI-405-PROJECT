import PropTypes from "prop-types"
import { useState } from "react"
import { uploadImagesToBackend } from "../../utils"
import { AttributeSelectionViewCards } from "../subComponents"

const { AttributeSelectorCard, DefineNewAttributeCard } =
	AttributeSelectionViewCards

export default function AttributeSelectionView({
	selectedFiles,
	setSelectedFiles,
	setFilesChosen
}) {
	const [attributesSelectedForThisImage, setAttributesSelectedForThisImage] =
		useState({})
	const [attributes, setAttributes] = useState([])
	const [addAttributeOpen, setAddAttributeOpen] = useState(false)
	const [possibleAttributes, setPossibleAttributes] = useState([])

	return (
		<section>
			<h2>Attribute Selection</h2>
			<h4>Image {selectedFiles.length}</h4>
			<img
				alt={"image-" + selectedFiles.length}
				src={"images/image-" + selectedFiles.length + ".png"}
			/>
			<h5>Define new attribute:</h5>
			{!addAttributeOpen ? (
				<AttributeSelectorCard
					attributesSelectedForThisImage={attributesSelectedForThisImage}
					setAttributesSelectedForThisImage={setAttributesSelectedForThisImage}
					possibleAttributes={possibleAttributes}
					setAddAttributeOpen={setAddAttributeOpen}
					addAttributeOpen={addAttributeOpen}
					attributes={attributes}
					setAttributes={setAttributes}
					setSelectedFiles={setSelectedFiles}
					setFilesChosen={setFilesChosen}
					setPossibleAttributes={setPossibleAttributes}
					selectedFiles={selectedFiles}
				/>
			) : (
				<DefineNewAttributeCard
					possibleAttributes={possibleAttributes}
					setPossibleAttributes={setPossibleAttributes}
					setAddAttributeOpen={setAddAttributeOpen}
					selectedFiles={selectedFiles}
					addAttributeOpen={addAttributeOpen}
					attributesSelectedForThisImage={attributesSelectedForThisImage}
					attributes={attributes}
					setAttributes={setAttributes}
					setSelectedFiles={setSelectedFiles}
					setFilesChosen={setFilesChosen}
					setAttributesSelectedForThisImage={setAttributesSelectedForThisImage}
				/>
			)}
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
						uploadImagesToBackend(setFilesChosen, attributes)
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
		</section>
	)
}

AttributeSelectionView.propTypes = {
	selectedFiles: PropTypes.array.isRequired,
	setSelectedFiles: PropTypes.func.isRequired,
	setFilesChosen: PropTypes.func.isRequired
}
