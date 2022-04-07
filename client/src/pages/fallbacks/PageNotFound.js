import styles from "./PageNotFound.module.sass"

export default function PageNotFound() {
	return (
		<main className={styles.container}>
			<article className={styles.content}>
				<h1 className={styles.heading}>404 - Page Not Found</h1>
				<p className={styles.description}> des</p>
			</article>
		</main>
	)
}
