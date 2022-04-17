import { useRecoilState } from "recoil"
import { ErrorBoundary } from "../../components"
import { fileDataState, possibleAttributesState } from "../../state"
import { _renderAttributeSelectionStackContent } from "../../logic"
import { AttributeSelectionFrame } from ".."

export default function AttributeSelectionStack() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	return (
		<ErrorBoundary level='stack'>
			{_renderAttributeSelectionStackContent(
				possibleAttributes,
				AttributeSelectionFrame,
				setPossibleAttributes,
				fileData,
				setFileData
			)}
		</ErrorBoundary>
	)
}
