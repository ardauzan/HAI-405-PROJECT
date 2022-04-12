import PropTypes from "prop-types"

export default function Error({ type }) {
	switch (type) {
		case "component":
			return <h2>View Crashed!</h2>
		case "root":
			return <h1>Client Crashed!!!!! sorry :(</h1>
		default:
			return <h6>Error</h6>
	}
}

Error.propTypes = {
	type: PropTypes.string
}
