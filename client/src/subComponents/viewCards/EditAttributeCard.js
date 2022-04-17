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
import { _canNotFinishDefining, _finishEditing } from "../../logic"

export default function EditAttributeCard() {
	const [newAttribute, setNewAttribute] = useState({ type: "string" })
	const [newStringAttributePossibleValues, setNewStringAttributePossibleValues] = useState({})
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setFileData = useSetRecoilState(fileDataState)
	const setEditAttribute = useSetRecoilState(editAttributeState)
	const attributeSelectedForEditing = useRecoilValue(attributeSelectedForEditingState)
	const possibleValuesSelectedForEditing = useRecoilValue(possibleValuesSelectedForEditingState)
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
					onClick={() =>
						_finishEditing(
							setFileData,
							newAttribute,
							possibleAttributes,
							setPossibleAttributes,
							newStringAttributePossibleValues,
							setEditAttribute
						)
					}>
					Finish Editing
				</button>
				<button
					onClick={() =>
						console.log(
							newAttribute,
							possibleAttributes,
							possibleValuesSelectedForEditing,
							newStringAttributePossibleValues
						)
					}>
					log
				</button>
			</article>
		</ErrorBoundary>
	)
}
