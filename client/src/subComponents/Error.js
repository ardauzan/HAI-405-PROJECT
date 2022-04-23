import PropTypes from "prop-types"
import DebugButton from "../components"
export default function Error({ level }) {
	const heading = () => {
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
			case "card":
				return <h3>Card Crashed!!!!</h3>
			case "stack":
				return <h4>Stack Crashed!!!</h4>
			case "grid":
				return <h4>Grid Crashed!!!</h4>
			case "cell":
				return <h5>Cell Crashed!!</h5>
			case "frame":
				return <h5>Frame Crashed!!</h5>
			default:
				return <h6>Error!</h6>
		}
	}
	return (
		<>
			{heading()}
			<DebugButton />
		</>
	)
}

Error.propTypes = {
	level: PropTypes.string
}
