import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { filesSelectedState, internalServerErrorCaughtState } from "../../state"
import { _renderAsyncContent, _renderGeneratorViews } from "../../logic"
import { AttributeSelectionView, FileSelectionView } from "../../subComponents"
import styles from "./Game.module.sass"

const { container, heading } = styles

export default function Generator() {
	const filesSelected = useRecoilValue(filesSelectedState)
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return _renderAsyncContent(
		internalServerErrorCaught,
		<ErrorBoundary level='page'>
			<main className={container}>
				<h1 className={heading}>Generator</h1>
				{_renderGeneratorViews(filesSelected, <FileSelectionView />, <AttributeSelectionView />)}
			</main>
		</ErrorBoundary>
	)
}
