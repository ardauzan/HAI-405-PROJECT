import styles from "./InternalServerError.module.sass"

export default function InternalServerError() {
	return (
		<main className={styles.container}>
			<article className={styles.content}>
				<h1 className={styles.heading}>500 - Internal Server Error</h1>
				<p className={styles.description}>
					Internal error occured on the backend.
				</p>
			</article>
		</main>
	)
}
