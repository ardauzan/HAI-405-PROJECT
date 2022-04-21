import { ErrorBoundary } from ".."
import { Nav } from "../../subComponents"
import { _hostIsLocal } from "../../utils"
import styles from "./Header.module.sass"
const { header, img } = styles
export default function Header() {
	const elements = _hostIsLocal()
		? [
				["Home", "/"],
				["Game", "/game"],
				["Generator", "/generator"]
		  ]
		: [
				["Home", "/"],
				["Game", "/game"]
		  ]
	return (
		<ErrorBoundary level='base'>
			<header className={header}>
				<img className={img} alt='logo' src='logo.png' />
				<Nav elements={elements} />
			</header>
		</ErrorBoundary>
	)
}
