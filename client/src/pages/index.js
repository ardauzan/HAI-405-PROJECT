import styles from "./index.module.sass"

const { container, heading } = styles

export default function Home() {
	return (
		<main className={container}>
			<h1 className={heading}>Home</h1>
		</main>
	)
}
