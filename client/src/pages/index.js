import styles from "./index.module.sass"

const { container, heading, heading2, button, heading3 } = styles

export default function Home() {
	return (
		<main className={container}>
			<h1 className={heading2}>Home</h1>
			<h1 className={heading}>Who Am I ?</h1>
			<p className={heading3}>
				TEXTTEXTTEXTTEXTTEXTTEXTTEXT Rules, explainations
			</p>
			<button className={button} onClick="opener.location='...'">
				Start Game
			</button>
		</main>
	)
}
