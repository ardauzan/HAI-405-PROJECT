import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"
import { StringAttributeDefinitionFrame } from ".."
import { ErrorBoundary } from "../../components"
import { possibleValuesSelectedForEditingState } from "../../state"
export default function StringAttributeEditionStack({ setNewStringAttributePossibleValues }) {
	const [newStringAttributePossibleInputs, setNewStringAttributePossibleInputs] = useState([])
	const [newStringAttributePossibleInputsCount, setNewStringAttributePossibleInputsCount] = useState(0)
	const possibleValuesSelectedForEditing = useRecoilValue(possibleValuesSelectedForEditingState)
	useEffect(() => {
		for (let i = 0; i < possibleValuesSelectedForEditing.length; i++) {
			setNewStringAttributePossibleInputs(prev => [
				...prev,
				<StringAttributeDefinitionFrame
					key={i}
					setNewStringAttributePossibleValues={setNewStringAttributePossibleValues}
					index={i}
				/>
			])
			setNewStringAttributePossibleInputsCount(prev => prev + 1)
		}
		return () => {
			setNewStringAttributePossibleInputs([])
			setNewStringAttributePossibleInputsCount(0)
		}
	}, [possibleValuesSelectedForEditing, setNewStringAttributePossibleValues])
	return (
		<ErrorBoundary level='stack'>
			<h4>Valeurs possibles :</h4>
			{newStringAttributePossibleInputs}
			<button
				onClick={() => {
					setNewStringAttributePossibleInputs(prev => [
						...prev,
						<StringAttributeDefinitionFrame
							key={newStringAttributePossibleInputsCount}
							setNewStringAttributePossibleValues={setNewStringAttributePossibleValues}
							index={newStringAttributePossibleInputsCount}
						/>
					])
					setNewStringAttributePossibleInputsCount(prev => prev + 1)
				}}>
				Nouvelle Valeur
			</button>
		</ErrorBoundary>
	)
}
StringAttributeEditionStack.propTypes = {
	setNewStringAttributePossibleValues: PropTypes.func.isRequired
}
