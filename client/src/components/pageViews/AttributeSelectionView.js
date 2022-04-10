import { useRecoilState, useRecoilValue } from "recoil"
import {
	fileDataState,
	filesCountState,
	addAttributeOpenState,
	indexState
} from "../../store"
import { uploadConfigToBackend, replaceObjectElementInArray } from "../../utils"
import { AttributeSelectionViewCards } from "../subComponents"
import styles from "./AttributeSelectionView.module.sass"

const { AttributeSelectorCard, DefineNewAttributeCard } =
	AttributeSelectionViewCards
const { container, heading } = styles

export default function AttributeSelectionView() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const filesCount = useRecoilValue(filesCountState)
	const addAttributeOpen = useRecoilValue(addAttributeOpenState)
	const [index, setIndex] = useRecoilState(indexState)
	return (
		<section className={container}>
			<h2 className={heading}>Attribute Selection</h2>
			<p>Image: {index + 1}</p>
			<img
				alt={"image-" + (index + 1)}
				src={"images/image-" + (index + 1) + ".png"}
			/>
			<h5>Define new attribute:</h5>
			{!addAttributeOpen ? (
				<AttributeSelectorCard />
			) : (
				<DefineNewAttributeCard index={index} />
			)}
			<button
				hidden={addAttributeOpen}
				onClick={() => {
					if (index < filesCount) {
						setFileData((prev) => {
							let tmpArr = prev
							let tmpObj = tmpArr[index]
							tmpObj = { ...tmpObj, attr1: null }
							return replaceObjectElementInArray(tmpArr, index, tmpObj)
						})
						setIndex((prev) => {
							return prev + 1
						})
					} else {
						uploadConfigToBackend(fileData)
					}
				}}
			>
				{index < filesCount ? "Next image!" : "Submit attributes"}
			</button>
			<button hidden={addAttributeOpen} onClick={() => {}}>
				Start-over!
			</button>
		</section>
	)
}
