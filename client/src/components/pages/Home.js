import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import styles from "./Home.module.sass"

const { container, heading, heading2, button, heading3 } = styles

export default function Home() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<ErrorBoundary level='page'>
			<main className={container}>
				<h1 className={heading2}>Home</h1>
				<h1 className={heading}>Who Am I ?</h1>
				<p className={heading3}>TEXTTEXTTEXTTEXTTEXTTEXTTEXT Rules, explainations</p>
				<button className={button} onClick="opener.location='...'">
					Start Game
				</button>
			</main>
		</ErrorBoundary>
	) : (
		<Navigate to='/500' />
	)
}
