import styles from "./Game.module.sass"

const { container, heading, description } = styles

export default function Game() {
	return (
		<main className={container}>
			<h1 className={heading}>Game</h1>
			<p className={description}>Game</p>
		</main>
	)
}
