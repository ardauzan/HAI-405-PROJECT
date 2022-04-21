import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { possibleAttributesState, addAttributeOpenState } from "../../state"
import { ErrorBoundary } from "../../components"
import { StringAttributeAdditionStack } from ".."
import { _finishDefining, _canNotFinishDefining } from "../../utils"
export default function AddAttributeCard() {
	const [newAttribute, setNewAttribute] = useState({ type: "boolean" })
	const [newStringAttributePossibleValues, setNewStringAttributePossibleValues] = useState({})
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	const setAttr = ([setNewAttribute, key], e) =>
		setNewAttribute(prev => {
			return {
				...prev,
				[key]: e.target.value
			}
		})
	return (
		<ErrorBoundary level='card'>
			<article>
				<h3>Ajouter un attribut</h3>
				<label htmlFor='atrName'>Nom :</label>
				<input type='text' id='atrName' onInput={e => setAttr([setNewAttribute, "name"], e)} />
				<h4>Type :</h4>
				<label htmlFor='atrStr'>String</label>
				<input
					type='radio'
					name='type'
					id='atrStr'
					value='string'
					onInput={e => setAttr([setNewAttribute, "type"], e)}
				/>
				<label htmlFor='atrBool'>Boolean</label>
				<input
					type='radio'
					name='type'
					defaultChecked
					id='atrBool'
					value='boolean'
					onInput={e => setAttr([setNewAttribute, "type"], e)}
				/>
				<label htmlFor='atrNum'>Number</label>
				<input
					type='radio'
					name='type'
					id='atrNum'
					value='number'
					onInput={e => setAttr([setNewAttribute, "type"], e)}
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
					Finir La Définition
				</button>
			</article>
		</ErrorBoundary>
	)
}
