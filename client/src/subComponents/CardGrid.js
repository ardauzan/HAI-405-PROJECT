import { useRecoilValue } from "recoil"
import { gameDataState } from "../state"
import { ErrorBoundary } from "../components"
import { GridCell } from "."
import styles from "./CardGrid.module.sass"
const { container } = styles
export default function CardGrid() {
	const gameData = useRecoilValue(gameDataState)
	return (
		<ErrorBoundary level='grid'>
			<article className={container}>
				{gameData.map((v, i) => (
					<GridCell vi={[v, i]} key={i} />
				))}
			</article>
		</ErrorBoundary>
	)
}
