import PropTypes from "prop-types"
import { useSetRecoilState } from "recoil"
import { ErrorBoundary } from "../../components"
import { addAttributeOpenState } from "../../state"
import { AttributeSelectionStack } from ".."
export default function AttributeSelectorCard({ index }) {
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	return (
		<ErrorBoundary level='card'>
			<article>
				<h3>Sélecteur Des Attributs</h3>
				<section>
					<h4>Sélectionnez les attributs de Image :</h4>
					<AttributeSelectionStack index={index} />
				</section>
				<section>
					<h4>Ou définissez un nouvel attribut :</h4>
					<button onClick={() => setAddAttributeOpen(true)}>définir un nouveau.</button>
				</section>
			</article>
		</ErrorBoundary>
	)
}
AttributeSelectorCard.propTypes = {
	index: PropTypes.number.isRequired
}
