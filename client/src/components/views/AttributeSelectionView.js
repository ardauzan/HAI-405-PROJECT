import PropTypes from "prop-types"
import { AttributeSelectorCard, DefineNewAttributeCard } from "../subComponents"

export default function AttributeSelectionView({
	possibleAttributes,
	setPossibleAttributes,
	attributesSelectedForThisImage,
	setAttributesSelectedForThisImage,
	addAttributeOpen,
	setAddAttributeOpen
}) {
	const renderContent = () => {
		return addAttributeOpen ? (
			<>
				<h5>Define new attribute:</h5>
				<DefineNewAttributeCard
					possibleAttributes={possibleAttributes}
					setPossibleAttributes={setPossibleAttributes}
					setAddAttributeOpen={setAddAttributeOpen}
				/>
			</>
		) : (
			<>
				<h5>Chose from these attributes (leave empty for unset):</h5>
				<AttributeSelectorCard
					attributesSelectedForThisImage={attributesSelectedForThisImage}
					setAttributesSelectedForThisImage={setAttributesSelectedForThisImage}
					possibleAttributes={possibleAttributes}
				/>
				<h5>Or add another one:</h5>
				<button onClick={() => setAddAttributeOpen(true)}>
					Add attribute!
				</button>
			</>
		)
	}
	return <div className="attributeSelectionView">{renderContent()}</div>
}

AttributeSelectionView.propTypes = {
	possibleAttributes: PropTypes.array.isRequired,
	setPossibleAttributes: PropTypes.func.isRequired,
	attributesSelectedForThisImage: PropTypes.array.isRequired,
	setAttributesSelectedForThisImage: PropTypes.func.isRequired,
	addAttributeOpen: PropTypes.bool.isRequired,
	setAddAttributeOpen: PropTypes.func.isRequired
}
