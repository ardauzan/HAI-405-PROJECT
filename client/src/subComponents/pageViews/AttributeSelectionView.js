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
import { _uploadConfigToBackend } from "../../utils"
import { ErrorBoundary } from "../../components"
import { AttributeSelectorCard, AddAttributeCard, EditAttributeCard } from ".."
import styles from "./AttributeSelectionView.module.sass"

const { container, heading } = styles

export default function AttributeSelectionView() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [index, setIndex] = useRecoilState(indexState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setInternalServerErrorCaught = useSetRecoilState(internalServerErrorCaughtState)
	const filesCount = useRecoilValue(filesCountState)
	const addAttributeOpen = useRecoilValue(addAttributeOpenState)
	const editAttributeOpen = useRecoilValue(editAttributeOpenState)
	const [imgNo, imgAlt, imgSrc] = [index + 1, "image-" + (index + 1), "images/image-" + (index + 1) + ".png"]
	const [nextImageLogic, nextImageText] =
		index + 1 < filesCount
			? [() => setIndex(prev => prev + 1), "Next image!"]
			: [_uploadConfigToBackend(fileData, setInternalServerErrorCaught), "Submit attributes!"]
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
				<button hidden={definitionOpen} onClick={() => nextImageLogic()}>
					{nextImageText}
				</button>
				<button
					hidden={definitionOpen}
					disabled={!possibleAttributes.length}
					onClick={() => {
						setPossibleAttributes([])
						setFileData([])
						setIndex(0)
					}}>
					Start over!
				</button>
				<button
					hidden={definitionOpen}
					disabled={!possibleAttributes.length}
					onClick={() => {
						console.log(fileData, possibleAttributes)
					}}>
					log
				</button>
			</section>
		</ErrorBoundary>
	)
}
