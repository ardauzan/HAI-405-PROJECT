/* eslint-disable no-console */
import { ErrorBoundary } from "../../components"
import { CardGrid } from ".."
import { useRecoilValue } from "recoil"
import { gameDataState } from "../../state"
import { _buildAllPossibleChoicesArray } from "../../utils"
import styles from "./GameGridCard.module.sass"
const { container } = styles
export default function GameGridCard() {
	const gameData = useRecoilValue(gameDataState)
	const gameAllAttributes = _buildAllPossibleChoicesArray(gameData)
	return (
		<ErrorBoundary level='card'>
			<article className={container}>
				<CardGrid />
				<button onClick={() => console.log(gameAllAttributes)}>gameAllAttributes</button>
			</article>
		</ErrorBoundary>
	)
}
