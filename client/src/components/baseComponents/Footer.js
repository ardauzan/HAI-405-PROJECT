import { ErrorBoundary } from ".."
import styles from "./Footer.module.sass"
const { footer, ol, li, ol2, li2, p, p2 } = styles
export default function Footer() {
	return (
		<ErrorBoundary level='base'>
			<footer className={footer}>
				<ol className={ol}>
					<li className={li}>
						<ol className={ol2}>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
						</ol>
					</li>
					<li className={li}>
						<ol className={ol2}>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
						</ol>
					</li>
					<li className={li}>
						<ol className={ol2}>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
							<li className={li2}>
								<p className={p}></p>
							</li>
						</ol>
					</li>
				</ol>
				<p className={p2}>UNLICENSED</p>
			</footer>
		</ErrorBoundary>
	)
}
