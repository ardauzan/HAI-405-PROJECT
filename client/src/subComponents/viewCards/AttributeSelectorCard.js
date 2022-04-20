import { useSetRecoilState } from "recoil"
import { ErrorBoundary } from "../../components"
import { addAttributeOpenState } from "../../state"
import { AttributeSelectionStack } from ".."
export default function AttributeSelectorCard() {
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	return (
		<ErrorBoundary level='card'>
			<article>
				<h3>Attribute Selector</h3>
				<section>
					<h4>Select attibutes for image:</h4>
					<AttributeSelectionStack />
				</section>
				<section>
					<h4>Or define a new attribute:</h4>
					<button onClick={() => setAddAttributeOpen(true)}>Define new.</button>
				</section>
			</article>
		</ErrorBoundary>
	)
}
