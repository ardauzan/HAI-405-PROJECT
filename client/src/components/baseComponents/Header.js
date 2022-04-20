import { ErrorBoundary } from ".."
export default function Header() {
	return (
		<ErrorBoundary level='base'>
			<header>
				<img alt='logo' src='asd' />
				<ol>
					<li></li>
					<li></li>
					<li></li>
				</ol>
			</header>
		</ErrorBoundary>
	)
}
