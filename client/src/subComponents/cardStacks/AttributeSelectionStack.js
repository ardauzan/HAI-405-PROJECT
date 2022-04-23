import PropTypes from "prop-types"
import { useRecoilState } from "recoil"
import { ErrorBoundary } from "../../components"
import { fileDataState, possibleAttributesState } from "../../state"
import { AttributeSelectionFrame } from ".."
export default function AttributeSelectionStack({ index }) {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	return (
		<ErrorBoundary level='stack'>
			{possibleAttributes.map((v, i) => (
				<article key={i}>
					<AttributeSelectionFrame index={index} v={v} i={i} />
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
						Supprimer Attribut
					</button>
				</article>
			))}
		</ErrorBoundary>
	)
}
AttributeSelectionStack.propTypes = {
	index: PropTypes.number.isRequired
}
