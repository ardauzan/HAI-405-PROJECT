import { ErrorBoundary } from ".."
import { Nav } from "../../subComponents"
export default function Header() {
	return (
		<ErrorBoundary level='base'>
			<header>
				<img alt='logo' src='logo.png' />
				<Nav
					elements={[
						["Home", "/"],
						["Game", "/game"],
						["Generator", "/generator"]
					]}
				/>
			</header>
		</ErrorBoundary>
	)
}
