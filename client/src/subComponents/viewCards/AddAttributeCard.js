import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { possibleAttributesState, addAttributeOpenState } from "../../state"
import { ErrorBoundary } from "../../components"
import { StringAttributeAdditionStack } from ".."
import { _setAttr, _canNotFinishDefining, _finishDefining } from "../../logic"

export default function AddAttributeCard() {
	const [newAttribute, setNewAttribute] = useState({ type: "boolean" })
	const [newStringAttributePossibleValues, setNewStringAttributePossibleValues] = useState({})
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	return (
		<ErrorBoundary level='card'>
			<article>
				<h3>Add Attribute</h3>
				<label htmlFor='atrName'>Attribute name:</label>
				<input type='text' id='atrName' onInput={e => _setAttr([setNewAttribute, "name"], e)} />
				<h4>Attribute type:</h4>
				<label htmlFor='atrStr'>String</label>
				<input
					type='radio'
					name='type'
					id='atrStr'
					value='string'
					onInput={e => _setAttr([setNewAttribute, "type"], e)}
				/>
				<label htmlFor='atrBool'>Boolean</label>
				<input
					type='radio'
					name='type'
					defaultChecked
					id='atrBool'
					value='boolean'
					onInput={e => _setAttr([setNewAttribute, "type"], e)}
				/>
				<label htmlFor='atrNum'>Number</label>
				<input
					type='radio'
					name='type'
					id='atrNum'
					value='number'
					onInput={e => _setAttr([setNewAttribute, "type"], e)}
				/>
				{newAttribute.type === "string" ? (
					<StringAttributeAdditionStack
						setNewStringAttributePossibleValues={setNewStringAttributePossibleValues}
					/>
				) : null}
				<button
					disabled={_canNotFinishDefining(
						newAttribute,
						newStringAttributePossibleValues,
						possibleAttributes
					)}
					onClick={() =>
						_finishDefining(
							newAttribute,
							setPossibleAttributes,
							newStringAttributePossibleValues,
							setAddAttributeOpen,
							"add"
						)
					}>
					Finish Defining
				</button>
				<button
					onClick={() =>
						console.log(newAttribute, possibleAttributes, newStringAttributePossibleValues)
					}>
					log
				</button>
			</article>
		</ErrorBoundary>
	)
}
