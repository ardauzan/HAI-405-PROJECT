import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import styles from "./Game.module.sass"

const { container, heading, description } = styles

export default function Game() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<ErrorBoundary level='page'>
			<main className={container}>
				<h1 className={heading}>Game</h1>
				<p className={description}>Game</p>
			</main>
		</ErrorBoundary>
	) : (
		<Navigate to='/500' />
	)
}
