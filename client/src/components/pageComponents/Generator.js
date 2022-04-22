import { useRecoilValue } from "recoil"
import { Navigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { ErrorBoundary } from ".."
import { filesSelectedState, internalServerErrorCaughtState } from "../../state"
import { _renderAsyncContent, _hostIsLocal } from "../../utils"
import { AttributeSelectionView, FileSelectionView } from "../../subComponents"
import styles from "./Generator.module.sass"
const { main } = styles
export default function Generator() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	const filesSelected = useRecoilValue(filesSelectedState)
	return _hostIsLocal() ? (
		_renderAsyncContent(
			internalServerErrorCaught,
			<ErrorBoundary level='page'>
				<Helmet>
					<title>Generator</title>
					<meta name='description' content='Generator for the game' />
				</Helmet>
				<main className={main}>{!filesSelected ? <FileSelectionView /> : <AttributeSelectionView />}</main>
			</ErrorBoundary>
		)
	) : (
		<Navigate to='/' />
	)
}
