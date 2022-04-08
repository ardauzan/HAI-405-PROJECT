import { Component } from "react"
import PropTypes from "prop-types"
import { Error } from "../subComponents"

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { isRoot: props.isRoot, hasError: false }
	}

	static getDerivedStateFromError(error) {
		console.error(error) /* eslint-disable-line no-console */
		return { hasError: true }
	}
	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo) /* eslint-disable-line no-console */
	}
	render() {
		if (this.state.hasError) {
			return <Error isRoot={this.props.isRoot} />
		}
		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	isRoot: PropTypes.bool
}

ErrorBoundary.defaultProps = {
	isRoot: false
}
