import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import {
	fileDataState,
	filesCountState,
	addAttributeOpenState,
	editAttributeOpenState,
	indexState,
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
	const [index, setIndex] = useRecoilState(indexState)
	const setPossibleAttributes = useSetRecoilState(possibleAttributesState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const filesCount = useRecoilValue(filesCountState)
	const addAttributeOpen = useRecoilValue(addAttributeOpenState)
	const editAttributeOpen = useRecoilValue(editAttributeOpenState)
	const [imgNo, imgAlt, imgSrc] = [index + 1, "image-" + (index + 1), "images/image-" + (index + 1) + ".png"]
	const canNotUploadConfig = () => {
		for (let i = 0; i < fileData.length; i++) {
			if (Object.keys(fileData[i]).length === 0) return true
		}
		return false
	}
	const [nextImageLogic, nextImageText, disabled] =
		index + 1 < filesCount
			? [() => setIndex(prev => prev + 1), "Next image!", false]
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
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2 className={heading}>Attribute Selection</h2>
				<p>Image: {imgNo}</p>
				<img alt={imgAlt} src={imgSrc} />
				<h5>Define new attribute:</h5>
				{!addAttributeOpen ? (
					!editAttributeOpen ? (
						<AttributeSelectorCard />
					) : (
						<EditAttributeCard />
					)
				) : (
					<AddAttributeCard />
				)}
				<button hidden={definitionOpen} disabled={index <= 0} onClick={() => previousImage(index, setIndex)}>
					Previous image!
				</button>
				<button hidden={definitionOpen} disabled={disabled} onClick={() => nextImageLogic()}>
					{nextImageText}
				</button>
				<button
					hidden={definitionOpen}
					onClick={() => {
						_startOver(setPossibleAttributes, setFileData, setIndex)
					}}>
					Start over!
				</button>
				<button
					hidden={definitionOpen}
					onClick={() => {
						console.log(fileData) /* eslint-disable-line no-console */
					}}>
					Log fileData
				</button>
			</section>
		</ErrorBoundary>
	)
}
