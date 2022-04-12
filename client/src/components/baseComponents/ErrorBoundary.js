/* eslint-disable no-console */

import { Component } from "react"
import PropTypes from "prop-types"
import { Error } from "../subComponents"

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { type: props.type, hasError: false }
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
			return <Error type={this.props.type} />
		}
		return this.props.children
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string
}
