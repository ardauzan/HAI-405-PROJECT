import PropTypes from "prop-types"

export default function AttributeDefinitionValueStackFrame({ setNewStringAttributePossibleValues, index }) {
	return (
		<input
			onChange={e => {
				setNewStringAttributePossibleValues(prev => ({ ...prev, [index]: e.target.value }))
			}}
		/>
	)
}
AttributeDefinitionValueStackFrame.propTypes = {
	setNewStringAttributePossibleValues: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
}
