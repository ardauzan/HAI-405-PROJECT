import { useState, useEffect } from "react"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import {
	fileDataState,
	possibleAttributesState,
	editAttributeState,
	attributeSelectedForEditingState,
	possibleValuesSelectedForEditingState
} from "../../state"
import { StringAttributeEditionStack } from ".."
import { _canNotFinishDefining, _finishDefining } from "../../utils"

export default function EditAttributeCard() {
	const [newAttribute, setNewAttribute] = useState({ type: "string" })
	const [newStringAttributePossibleValues, setNewStringAttributePossibleValues] = useState({})
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setFileData = useSetRecoilState(fileDataState)
	const setEditAttribute = useSetRecoilState(editAttributeState)
	const attributeSelectedForEditing = useRecoilValue(attributeSelectedForEditingState)
	const possibleValuesSelectedForEditing = useRecoilValue(possibleValuesSelectedForEditingState)

	const finishEditing = () => {
		_finishDefining(newAttribute, setPossibleAttributes, newStringAttributePossibleValues, setEditAttribute, "edit")
		setFileData(prev => {
			let tmpArr = []
			let tmpObj = {}
			for (let i = 0; i < prev.length; i++) {
				tmpObj = prev[i]
				let { [attributeSelectedForEditing]: val, ...rest } = tmpObj
				if (!Object.values(newStringAttributePossibleValues).includes(val)) {
					tmpObj = rest
				}
				tmpArr.push(tmpObj)
			}
			return tmpArr
		})
	}

	useEffect(() => {
		setNewAttribute(prev => ({
			...prev,
			name: attributeSelectedForEditing
		}))
		setNewStringAttributePossibleValues(possibleValuesSelectedForEditing)
		return () => {
			setNewAttribute({ type: "string" })
			setNewStringAttributePossibleValues({})
		}
	}, [attributeSelectedForEditing, possibleValuesSelectedForEditing])
	return (
		<ErrorBoundary level='card'>
			<article>
				<h3>Edit Attribute Values for key: {attributeSelectedForEditing}</h3>
				<StringAttributeEditionStack
					setNewStringAttributePossibleValues={setNewStringAttributePossibleValues}
				/>
				<button
					disabled={_canNotFinishDefining(
						newAttribute,
						newStringAttributePossibleValues,
						possibleAttributes
					)}
					onClick={() => finishEditing()}>
					Finish Editing
				</button>
			</article>
		</ErrorBoundary>
	)
}
