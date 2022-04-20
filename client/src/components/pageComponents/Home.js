import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import styles from "./Home.module.sass"
const { container } = styles
export default function Home() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<ErrorBoundary level='page'>
			<main className={container}></main>
		</ErrorBoundary>
	) : (
		<Navigate to='/500' />
	)
}
