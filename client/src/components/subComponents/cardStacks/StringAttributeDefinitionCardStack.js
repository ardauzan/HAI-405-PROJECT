import PropTypes from "prop-types"
import { StringAttributeDefinitionStackFrame } from ".."

export default function StringAttributeDefinitionCardStack({
	newAttribute,
	newStringAttributePossibleInputsCount,
	setNewStringAttributePossibleInputsCount,
	newStringAttributePossibleInputs,
	setNewStringAttributePossibleInputs,
	setNewStringAttributePossibleValues
}) {
	return newAttribute.type === "string" ? (
		<>
			<h4>Possible Values:</h4>
			{newStringAttributePossibleInputs}
			<button
				onClick={() => {
					setNewStringAttributePossibleInputs(prev => [
						...prev,
						<StringAttributeDefinitionStackFrame
							key={newStringAttributePossibleInputsCount}
							setNewStringAttributePossibleValues={setNewStringAttributePossibleValues}
							index={newStringAttributePossibleInputsCount}
						/>
					])
					setNewStringAttributePossibleInputsCount(prev => prev + 1)
				}}>
				New Value
			</button>
		</>
	) : null
}

StringAttributeDefinitionCardStack.propTypes = {
	newAttribute: PropTypes.object.isRequired,
	newStringAttributePossibleInputsCount: PropTypes.number.isRequired,
	setNewStringAttributePossibleInputsCount: PropTypes.func.isRequired,
	newStringAttributePossibleInputs: PropTypes.array.isRequired,
	setNewStringAttributePossibleInputs: PropTypes.func.isRequired,
	setNewStringAttributePossibleValues: PropTypes.func.isRequired
}
