import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { filesSelectedState, internalServerErrorCaughtState } from "../../state"
import { _renderAsyncContent } from "../../utils"
import { AttributeSelectionView, FileSelectionView } from "../../subComponents"
import styles from "./Generator.module.sass"

const { container, heading } = styles

export default function Generator() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	const filesSelected = useRecoilValue(filesSelectedState)

	return _renderAsyncContent(
		internalServerErrorCaught,
		<ErrorBoundary level='page'>
			<main className={container}>
				<h1 className={heading}>Generator</h1>
				{!filesSelected ? <FileSelectionView /> : <AttributeSelectionView />}
			</main>
		</ErrorBoundary>
	)
}
