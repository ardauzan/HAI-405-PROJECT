import { useState } from "react"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import {
	fileDataState,
	filesCountState,
	addAttributeOpenState,
	editAttributeOpenState,
	possibleAttributesState,
	internalServerErrorCaughtState
} from "../../state"
import { _uploadConfigToBackend, _startOver } from "../../utils"
import { ErrorBoundary } from "../../components"
import { AttributeSelectorCard, AddAttributeCard, EditAttributeCard } from ".."
import styles from "./AttributeSelectionView.module.sass"
const { container, heading } = styles
export default function AttributeSelectionView() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [index, setIndex] = useState(0)
	const setPossibleAttributes = useSetRecoilState(possibleAttributesState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const filesCount = useRecoilValue(filesCountState)
	const addAttributeOpen = useRecoilValue(addAttributeOpenState)
	const editAttributeOpen = useRecoilValue(editAttributeOpenState)
	const [imgNo, imgAlt, imgSrc] = [index + 1, "image-" + (index + 1), "images/image-" + (index + 1) + ".png"]
	const canNotUploadConfig = () => {
		for (let i = 0; i < fileData.length; i++) if (Object.keys(fileData[i]).length === 0) return true
		return false
	}
	const [nextImageLogic, nextImageText, disabled] =
		index + 1 < filesCount
			? [() => setIndex(prev => prev + 1), "Image Suivante", false]
			: [
					() =>
						_uploadConfigToBackend(fileData, setInternalServerErrorCaught, () =>
							_startOver(setPossibleAttributes, setFileData, setIndex)
						),
					"Submit attributes!",
					canNotUploadConfig()
			  ]
	const definitionOpen = addAttributeOpen || editAttributeOpen
	const previousImage = (index, setIndex) => (index > 0 ? setIndex(prev => prev - 1) : null)
	const buttons = [
		<button key='b1' hidden={definitionOpen} disabled={index <= 0} onClick={() => previousImage(index, setIndex)}>
			Image Précédente
		</button>,
		<button key='b2' hidden={definitionOpen} disabled={disabled} onClick={() => nextImageLogic()}>
			{nextImageText}
		</button>,
		<button
			key='b3'
			hidden={definitionOpen}
			onClick={() => {
				_startOver(setPossibleAttributes, setFileData, setIndex)
			}}>
			Recommencer
		</button>
	]
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2 className={heading}>Sélection Des Attributs</h2>
				<p>Image: {imgNo}</p>
				<img alt={imgAlt} src={imgSrc} />
				<h5>Définir un nouvel attribut :</h5>
				{!addAttributeOpen ? (
					!editAttributeOpen ? (
						<AttributeSelectorCard index={index} />
					) : (
						<EditAttributeCard />
					)
				) : (
					<AddAttributeCard />
				)}
				{buttons}
			</section>
		</ErrorBoundary>
	)
}
