/* eslint-disable no-console */
import { Component } from "react"
import PropTypes from "prop-types"
import { Error } from "../subComponents"
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { level: props.level, hasError: false }
	}
	static getDerivedStateFromError(error) {
		console.error(error)
		return { hasError: true }
	}
	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo)
	}
	render() {
		if (this.state.hasError) {
			return <Error level={this.props.level} />
		}
		return this.props.children
	}
}
ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	level: PropTypes.string
}
