import styles from "./InternalServerError.module.sass"

const { container, heading, description } = styles

export default function InternalServerError() {
	return (
		<main className={container}>
			<h1 className={heading}>500 | Internal Server Error</h1>
			<p className={description}>Internal error occured on the backend.</p>
		</main>
	)
}
