import { useRecoilState } from "recoil"
import { fileDataState, possibleAttributesState } from "../../../store"
import { AttributeSelectionStackFrame } from ".."

export default function AttributeSelectionCardStack() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	return (
		<>
			{possibleAttributes.map((v, i) => (
				<article key={i}>
					<AttributeSelectionStackFrame v={v} i={i} />
					<button
						onClick={() => {
							let tmpArr = []
							for (let ii = 0; ii < possibleAttributes.length - 1; ii++) {
								if (possibleAttributes[ii].name !== v.name) {
									tmpArr.push(possibleAttributes[ii])
								}
							}
							setPossibleAttributes(tmpArr)
							tmpArr = []
							for (let ii = 0; ii < fileData.length; ii++) {
								tmpArr.push({})
								for (let iii in fileData[ii]) {
									if (iii === v.name) {
										continue
									}
									tmpArr[ii] = { ...tmpArr[ii], [iii]: fileData[ii][iii] }
								}
							}
							setFileData(tmpArr)
						}}>
						Delete attribute
					</button>
				</article>
			))}
		</>
	)
}
