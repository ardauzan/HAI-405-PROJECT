import { Navigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { internalServerErrorCaughtState } from "../store"
import styles from "./Game.module.sass"

const { container, heading, description } = styles

export default function Game() {
	const internalServerErrorCaught = useRecoilValue(internalServerErrorCaughtState)
	return !internalServerErrorCaught ? (
		<main className={container}>
			<h1 className={heading}>Game</h1>
			<p className={description}>Game</p>
		</main>
	) : (
		<Navigate to="/500" />
	)
}
