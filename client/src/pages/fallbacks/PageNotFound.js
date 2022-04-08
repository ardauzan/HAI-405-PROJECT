import styles from "./PageNotFound.module.sass"

const { container, heading, description } = styles

export default function PageNotFound() {
	return (
		<main className={container}>
			<h1 className={heading}>404 - Page Not Found</h1>
			<p className={description}> des</p>
		</main>
	)
}
