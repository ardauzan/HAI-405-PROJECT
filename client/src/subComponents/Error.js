import PropTypes from "prop-types"
export default function Error({ level }) {
	switch (level) {
		case "root":
			return <h1>Client Crashed!!!!!!! sorry :(</h1>
		case "page":
			return <h1>Page Crashed!!!!!!</h1>
		case "fallback":
			return <h1>Fallback Page Crashed!!!!!!</h1>
		case "base":
			return <h2>Base Component Crashed!!!!!</h2>
		case "view":
			return <h2>View Crashed!!!!!</h2>
		case "generic":
			return <h3>Generic Component Crashed!!!!</h3>
		case "card":
			return <h3>Card Crashed!!!!</h3>
		case "stack":
			return <h4>Stack Crashed!!!</h4>
		case "grid":
			return <h4>Grid Crashed!!!</h4>
		case "frame":
			return <h5>Frame Crashed!!</h5>
		default:
			return <h6>Error!</h6>
	}
}
Error.propTypes = {
	level: PropTypes.string
}
