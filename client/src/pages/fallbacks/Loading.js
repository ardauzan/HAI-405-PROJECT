import styles from "./Loading.module.sass"

const { container, heading, description } = styles

export default function Loading() {
	return (
		<main className={container}>
			<h1 className={heading}>Loading</h1>
			<p className={description}>This is taking longer than usual...</p>
		</main>
	)
}
