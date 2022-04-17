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
import {
	_imageData,
	_renderAttributeSelectionContent,
	_previousImage,
	_nextImageOrFinishData,
	_startOver
} from "../../logic"
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
	const [imgNo, imgAlt, imgSrc] = _imageData(index)
	const [nextImageLogic, nextImageText] = _nextImageOrFinishData(
		index,
		setIndex,
		filesCount,
		fileData,
		setInternalServerErrorCaught
	)
	const definitionOpen = addAttributeOpen || editAttributeOpen
	return (
		<ErrorBoundary level='view'>
			<section className={container}>
				<h2 className={heading}>Attribute Selection</h2>
				<p>Image: {imgNo}</p>
				<img alt={imgAlt} src={imgSrc} />
				<h5>Define new attribute:</h5>
				{_renderAttributeSelectionContent(
					addAttributeOpen,
					editAttributeOpen,
					<AttributeSelectorCard />,
					<EditAttributeCard />,
					<AddAttributeCard />
				)}
				<button
					hidden={definitionOpen}
					disabled={index <= 0}
					onClick={() => _previousImage(index, setIndex)}>
					Previous image!
				</button>
				<button hidden={definitionOpen} onClick={() => nextImageLogic()}>
					{nextImageText}
				</button>
				<button
					hidden={definitionOpen}
					disabled={!possibleAttributes.length}
					onClick={() => _startOver(setPossibleAttributes, setFileData, setIndex)}>
					Start over!
				</button>
			</section>
		</ErrorBoundary>
	)
}
