import { useState } from "react"
import PropTypes from "prop-types"
import { ErrorBoundary } from "../../components"
import { StringAttributeDefinitionFrame } from ".."
export default function StringAttributeAdditionStack({ setNewStringAttributePossibleValues }) {
	const [newStringAttributePossibleInputsCount, setNewStringAttributePossibleInputsCount] = useState(0)
	const [newStringAttributePossibleInputs, setNewStringAttributePossibleInputs] = useState([])
	return (
		<ErrorBoundary level='stack'>
			<h4>Valeurs Possibles :</h4>
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
StringAttributeAdditionStack.propTypes = {
	setNewStringAttributePossibleValues: PropTypes.func.isRequired
}
