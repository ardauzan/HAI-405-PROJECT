import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { ErrorBoundary } from ".."
import { internalServerErrorCaughtState } from "../../state"
import styles from "./Home.module.sass"
const { main, h1, p } = styles
export default function Home() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<ErrorBoundary level='page'>
			<main className={main}></main>
			<h1 className={h1}>Who am I?</h1>
			<p className={p}>description</p>
		</ErrorBoundary>
	) : (
		<Navigate to='/500' />
	)
}
