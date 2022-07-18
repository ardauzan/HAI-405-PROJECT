import { ErrorBoundary } from "../../components"
import { CardGrid } from ".."
import styles from "./GameGridCard.module.sass"
const { container } = styles
export default function GameGridCard() {
	return (
		<ErrorBoundary level='card'>
			<article className={container}>
				<CardGrid />
			</article>
		</ErrorBoundary>
	)
}
