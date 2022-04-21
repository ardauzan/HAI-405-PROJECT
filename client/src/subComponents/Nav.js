import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import styles from "./Nav.module.sass"
const { nav, ol, li, activeNavLink, passiveNavlink } = styles
export default function Nav({ elements }) {
	return (
		<nav className={nav}>
			<ol className={ol}>
				{elements.map((v, i) => (
					<li className={li} key={i}>
						<NavLink
							to={v[1]}
							className={({ isActive }) => (isActive ? activeNavLink : passiveNavlink)}>
							{v[0]}
						</NavLink>
					</li>
				))}
			</ol>
		</nav>
	)
}

Nav.propTypes = {
	elements: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
}
