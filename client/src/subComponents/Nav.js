import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

export default function Nav({ elements }) {
	return (
		<nav>
			<ol>
				{elements.map((v, i) => (
					<li key={i}>
						<NavLink
							to={v[1]}
							className={({ isActive }) => (isActive ? "activeClassName" : undefined)}>
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
