import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { filesSelectedState, internalServerErrorCaughtState } from "../store"
import { generatorViews } from "../components"
import styles from "./Game.module.sass"

const { AttributeSelectionView, FileSelectionView } = generatorViews
const { container, heading } = styles

export default function Generator() {
	const filesSelected = useRecoilValue(filesSelectedState)
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<main className={container}>
			<h1 className={heading}>Generator</h1>
			{!filesSelected ? <FileSelectionView /> : <AttributeSelectionView />}
		</main>
	) : (
		<Navigate to="/500" />
	)
}
