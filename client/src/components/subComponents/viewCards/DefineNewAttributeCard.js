import { useState, useEffect } from "react"

import PropTypes from "prop-types"

export default function DefineNewAttributeCard({
	possibleAttributes,
	setPossibleAttributes,
	setAddAttributeOpen
}) {
	useEffect(() => {
		setNewAttribute({ type: "boolean" })
	}, [])
	const [newAttribute, setNewAttribute] = useState({})
	const [newValues, setNewValues] = useState([])
	const [newPossibilities, setnewPossibilities] = useState({})
	const renderContent = () => (
		<>
			<h5>Attribute name:</h5>
			<input
				type="text"
				id="atrName"
				onInput={(e) =>
					setNewAttribute({
						...newAttribute,
						name: e.target.value
					})
				}
			/>
			<h5>Attribute type:</h5>
			<label htmlFor="atrStr">String</label>
			<input
				type="radio"
				name="type"
				id="atrStr"
				onInput={() => {
					setNewAttribute({
						...newAttribute,
						type: "string"
					})
					setnewPossibilities({})
					setNewValues([])
				}}
			/>
			<label htmlFor="atrBool">Boolean</label>
			<input
				type="radio"
				name="type"
				defaultChecked
				id="atrBool"
				onInput={() => {
					setNewAttribute({
						...newAttribute,
						type: "boolean"
					})
					setnewPossibilities({})
					setNewValues([])
				}}
			/>
			<label htmlFor="atrNum">Number</label>
			<input
				type="radio"
				name="type"
				id="atrNum"
				onInput={() => {
					setNewAttribute({
						...newAttribute,
						type: "number"
					})
					setnewPossibilities({})
					setNewValues([])
				}}
			/>
			<div hidden={!(newAttribute.type === "string")}>
				<h5>Possible Values:</h5>
				{newValues}
				<button
					onClick={() => {
						setNewValues([
							...newValues,
							<input
								type="text"
								id={"artN-" + newValues.length}
								key={newValues.length}
								onChange={(e) =>
									setnewPossibilities((previousState) => {
										return {
											...previousState,
											["artN-" + newValues.length]: e.target.value
										}
									})
								}
							/>
						])
					}}
				>
					New Value
				</button>
			</div>
			<button
				disabled={
					(newAttribute.type === "string" &&
						(newValues.length < 2 ||
							Object.values(newPossibilities).includes(""))) ||
					(newAttribute.type !== "string" &&
						possibleAttributes.some((a) => a.name === newAttribute.name))
				}
				onClick={() => {
					setPossibleAttributes([
						...possibleAttributes,
						newAttribute.type === "string"
							? { ...newAttribute, possibilities: newPossibilities }
							: newAttribute
					])
					setAddAttributeOpen(false)
				}}
			>
				Finish Defining
			</button>
		</>
	)
	return <div className="defineNewAttribute">{renderContent()}</div>
}

DefineNewAttributeCard.propTypes = {
	possibleAttributes: PropTypes.array.isRequired,
	setPossibleAttributes: PropTypes.func.isRequired,
	setAddAttributeOpen: PropTypes.func.isRequired
}
