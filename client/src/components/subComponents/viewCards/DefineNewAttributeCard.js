import PropTypes from "prop-types"
import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { possibleAttributesState, addAttributeOpenState } from "../../../store"

export default function DefineNewAttributeCard() {
	const [newAttribute, setNewAttribute] = useState({ type: "boolean" })
	const [
		newStringAttributePossibleValues,
		setNewStringAttributePossibleValues
	] = useState({})
	const [
		newStringAttributePossibleInputsCount,
		setNewStringAttributePossibleInputsCount
	] = useState(0)
	const [
		newStringAttributePossibleInputs,
		setNewStringAttributePossibleInputs
	] = useState([])
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(
		possibleAttributesState
	)
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	const StringInput = ({ index, setNewStringAttributePossibleValues }) => {
		return (
			<input
				onInput={(e) => {
					setNewStringAttributePossibleValues((prev) => {
						return { ...prev, [index]: e.target.value }
					})
				}}
			/>
		)
	}
	StringInput.propTypes = {
		index: PropTypes.number.isRequired,
		setNewStringAttributePossibleValues: PropTypes.func.isRequired
	}
	return (
		<article>
			<h3>Define New Attribute</h3>
			<label htmlFor="atrName">Attribute name:</label>
			<input
				type="text"
				id="atrName"
				onInput={(e) =>
					setNewAttribute((prev) => {
						return {
							...prev,
							name: e.target.value
						}
					})
				}
			/>
			<h4>Attribute type:</h4>
			<label htmlFor="atrStr">String</label>
			<input
				type="radio"
				name="type"
				id="atrStr"
				onInput={() => {
					setNewAttribute((prev) => {
						return {
							...prev,
							type: "string"
						}
					})
				}}
			/>
			<label htmlFor="atrBool">Boolean</label>
			<input
				type="radio"
				name="type"
				defaultChecked
				id="atrBool"
				onInput={() => {
					setNewAttribute((prev) => {
						return {
							...prev,
							type: "boolean"
						}
					})
					setNewStringAttributePossibleValues({})
					setNewStringAttributePossibleInputs([])
					setNewStringAttributePossibleInputsCount(0)
				}}
			/>
			<label htmlFor="atrNum">Number</label>
			<input
				type="radio"
				name="type"
				id="atrNum"
				onInput={() => {
					setNewAttribute((prev) => {
						return {
							...prev,
							type: "number"
						}
					})
					setNewStringAttributePossibleValues({})
					setNewStringAttributePossibleInputs([])
					setNewStringAttributePossibleInputsCount(0)
				}}
			/>
			{newAttribute.type === "string" ? (
				<>
					<h4>Possible Values:</h4>
					{newStringAttributePossibleInputs}
					<button
						onClick={() => {
							setNewStringAttributePossibleInputs((prev) => {
								return [
									...prev,
									<StringInput
										setNewStringAttributePossibleValues={
											setNewStringAttributePossibleValues
										}
										index={newStringAttributePossibleInputsCount}
										key={newStringAttributePossibleInputsCount}
									/>
								]
							})
							setNewStringAttributePossibleInputsCount((prev) => prev + 1)
						}}
					>
						New Value
					</button>
				</>
			) : null}
			<button
				disabled={
					!newAttribute.name ||
					/^ *$/.test(newAttribute.name) ||
					(newAttribute.type === "string" &&
						Object.values(newStringAttributePossibleValues).filter((i) => {
							return !/^ *$/.test(i)
						}).length < 2) ||
					(newAttribute.type === "string" &&
						Object.values(newStringAttributePossibleValues).filter(
							(i) => i !== ""
						).length <= 1) ||
					(newAttribute.type === "string" &&
						(() => {
							const tmpArr = Object.values(
								newStringAttributePossibleValues
							).filter((i) => i !== "")
							const tmpSet = new Set(tmpArr)
							return tmpSet.size < tmpArr.length
						})()) ||
					(() => {
						for (let ii = 0; ii < possibleAttributes.length; ii++) {
							if (possibleAttributes[ii].name === newAttribute.name) {
								return true
							}
						}
						return false
					})()
				}
				onClick={() =>
					newAttribute.type === "string"
						? (() => {
								setPossibleAttributes((prev) => {
									return [
										...prev,
										{
											...newAttribute,
											possibilities: Object.values(
												newStringAttributePossibleValues
											).filter((i) => (i ? !/^ *$/.test(i) : false))
										}
									]
								})
								setAddAttributeOpen(false)
						  })()
						: (() => {
								setPossibleAttributes((prev) => {
									return [...prev, newAttribute]
								})
								setAddAttributeOpen(false)
						  })()
				}
			>
				Finish Defining
			</button>
		</article>
	)
}
