import { RecoilRoot } from "recoil"
import PropTypes from "prop-types"
export default function Store({ children }) {
	return <RecoilRoot>{children}</RecoilRoot>
}
Store.propTypes = {
	children: PropTypes.node.isRequired
}
