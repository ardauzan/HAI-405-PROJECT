import PropTypes from "prop-types"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { ErrorBoundary } from "../../components"
import { fileDataState, editAttributeState, indexState, possibleAttributesState } from "../../state"
import { _renderAttributeSelectionChoiceHeading, _renderAttributeSelectionChoiceContent } from "../../logic"

export default function AttributeSelectionChoiceFrame({ v, i }) {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setEditAttribute = useSetRecoilState(editAttributeState)
	const index = useRecoilValue(indexState)
	return (
		<ErrorBoundary level='frame'>
			<article>
				<h4>{_renderAttributeSelectionChoiceHeading(v)}</h4>
				{_renderAttributeSelectionChoiceContent(
					v,
					i,
					fileData,
					setFileData,
					possibleAttributes,
					setPossibleAttributes,
					setEditAttribute,
					index
				)}
			</article>
		</ErrorBoundary>
	)
}

AttributeSelectionChoiceFrame.propTypes = {
	v: PropTypes.exact({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		possibilities: PropTypes.arrayOf(PropTypes.string)
	}).isRequired,
	i: PropTypes.number.isRequired
}
