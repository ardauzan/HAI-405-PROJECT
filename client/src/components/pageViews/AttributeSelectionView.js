import { useRecoilState, useRecoilValue } from "recoil"
import { fileDataState, filesCountState, addAttributeOpenState, indexState, possibleAttributesState } from "../../store"
import { ErrorBoundary } from "../baseComponents"
import { AttributeSelectionViewCards } from "../subComponents"
import { uploadConfigToBackend } from "../../utils"
import styles from "./AttributeSelectionView.module.sass"

const { AttributeSelectorCard, DefineNewAttributeCard } = AttributeSelectionViewCards
const { container, heading } = styles

export default function AttributeSelectionView() {
	const filesCount = useRecoilValue(filesCountState)
	const addAttributeOpen = useRecoilValue(addAttributeOpenState)
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [index, setIndex] = useRecoilState(indexState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	return (
		<ErrorBoundary type="view">
			<section className={container}>
				<h2 className={heading}>Attribute Selection</h2>
				<p>Image: {index + 1}</p>
				<img alt={"image-" + (index + 1)} src={"images/image-" + (index + 1) + ".png"} />
				<h5>Define new attribute:</h5>
				{!addAttributeOpen ? <AttributeSelectorCard /> : <DefineNewAttributeCard />}
				<button
					hidden={addAttributeOpen}
					disabled={index <= 0}
					onClick={() => {
						if (index > 0) {
							setIndex(prev => {
								return prev - 1
							})
						}
					}}>
					Previous image!
				</button>
				<button
					hidden={addAttributeOpen}
					onClick={() =>
						!(index + 1 < filesCount) ? uploadConfigToBackend(fileData) : setIndex(prev => prev + 1)
					}>
					{index + 1 < filesCount ? "Next image!" : "Submit attributes!"}
				</button>
				<button
					hidden={addAttributeOpen}
					disabled={!possibleAttributes.length}
					onClick={() => {
						setPossibleAttributes([])
						setFileData([])
						setIndex(0)
					}}>
					Start over!
				</button>
			</section>
		</ErrorBoundary>
	)
}
