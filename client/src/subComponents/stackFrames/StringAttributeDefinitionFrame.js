import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import { possibleValuesSelectedForEditingState } from "../../state"
export default function StringAttributeDefinitionFrame({ setNewStringAttributePossibleValues, index }) {
	const possibleValuesSelectedForEditing = useRecoilValue(possibleValuesSelectedForEditingState)
	return (
		<ErrorBoundary level='frame'>
			<input
				defaultValue={possibleValuesSelectedForEditing ? possibleValuesSelectedForEditing[index] : ""}
				onInput={e => {
					setNewStringAttributePossibleValues(prev => ({ ...prev, [index]: e.target.value }))
				}}
			/>
		</ErrorBoundary>
	)
}
StringAttributeDefinitionFrame.propTypes = {
	setNewStringAttributePossibleValues: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
}
