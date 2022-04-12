import { useSetRecoilState } from "recoil"
import { addAttributeOpenState } from "../../../store"
import { AttributeSelectionCardStack } from ".."

export default function AttributeSelectorCard() {
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	return (
		<article>
			<h3>Attribute Selector</h3>
			<section>
				<h4>Select attibutes for image:</h4>
				<AttributeSelectionCardStack />
			</section>
			<section>
				<h4>Or define a new attribute:</h4>
				<button onClick={() => setAddAttributeOpen(true)}>Define new.</button>
			</section>
		</article>
	)
}
