import styles from "./Loading.module.sass"

export default function Loading() {
	return (
		<main className={styles.container}>
			<article className={styles.content}>
				<h1 className={styles.heading}>Loading...</h1>
				<p className={styles.description}></p>
			</article>
		</main>
	)
}
