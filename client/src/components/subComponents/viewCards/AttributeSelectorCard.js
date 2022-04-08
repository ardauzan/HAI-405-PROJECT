import PropTypes from "prop-types"
export default function AttributeSelectorCard({
	possibleAttributes,
	attributesSelectedForThisImage,
	setAttributesSelectedForThisImage,
	setAddAttributeOpen
}) {
	const renderStringSelection = (v) => {
		let tmpArr1 = []
		const tmpArr2 = Object.keys(v.possibilities).map((i) => [
			v.possibilities[i]
		])
		for (let i = 0; i < tmpArr2.length; i++) {
			tmpArr1 = [
				...tmpArr1,
				<div key={i}>
					<label htmlFor={"artN2-" + i}>{tmpArr2[i]}</label>
					<input
						type="radio"
						name={v.name}
						defaultChecked={attributesSelectedForThisImage[tmpArr2[i]]}
						onInput={() => {
							setAttributesSelectedForThisImage({
								...attributesSelectedForThisImage,
								[v.name]: tmpArr2[i][0]
							})
						}}
						id={"artN2-" + i}
					/>
				</div>
			]
		}
		return tmpArr1
	}
	const renderBooleanSelection = (v, i) => (
		<>
			<label htmlFor={"artN3-" + i}>{v[i]}</label>
			<input
				type="checkbox"
				name={v.name}
				defaultChecked={attributesSelectedForThisImage[v.name]}
				onInput={() => {
					setAttributesSelectedForThisImage({
						...attributesSelectedForThisImage,
						[v.name]: !attributesSelectedForThisImage[v.name]
					})
				}}
				id={"artN3-" + i}
			/>
		</>
	)
	const renderNumberSelection = (v, i) => (
		<>
			<label htmlFor={"artN4-" + i}>{v[i]}</label>
			<input
				type="number"
				defaultv={attributesSelectedForThisImage[v.name] | 0}
				name={v.i}
				onInput={(e) => {
					setAttributesSelectedForThisImage({
						...attributesSelectedForThisImage,
						[v.name]: e.target.v
					})
				}}
				id={"artN4-" + i}
				min="0"
			/>
		</>
	)
	const renderContent = () => (
		<>
			<h5>Chose from these attributes (leave empty for unset):</h5>
			{possibleAttributes.map((v, i) => {
				switch (v.type) {
					case "string":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{renderStringSelection(v)}
							</div>
						)
					case "boolean":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{renderBooleanSelection(v, i)}
							</div>
						)
					case "number":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{renderNumberSelection(v, i)}
							</div>
						)
				}
			})}
			<h5>Or add another one:</h5>
			<button onClick={() => setAddAttributeOpen(true)}>Add attribute!</button>
		</>
	)
	return <div className="attributeSelector">{renderContent()}</div>
}

AttributeSelectorCard.propTypes = {
	possibleAttributes: PropTypes.array.isRequired,
	attributesSelectedForThisImage: PropTypes.object.isRequired,
	setAttributesSelectedForThisImage: PropTypes.func.isRequired,
	setAddAttributeOpen: PropTypes.func.isRequired,
	addAttributeOpen: PropTypes.bool.isRequired,
	attributes: PropTypes.array.isRequired,
	setAttributes: PropTypes.func.isRequired,
	setFilesChosen: PropTypes.func.isRequired,
	setPossibleAttributes: PropTypes.func.isRequired
}
