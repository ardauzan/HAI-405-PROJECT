import PropTypes from "prop-types"
import { useRecoilState, useSetRecoilState } from "recoil"
import { ErrorBoundary } from "../../components"
import { fileDataState, editAttributeState, possibleAttributesState } from "../../state"
export default function AttributeSelectionFrame({ index, v, i }) {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(possibleAttributesState)
	const setEditAttribute = useSetRecoilState(editAttributeState)
	const _replaceObjectElementInArrayAtIndex = (l, index, newE) => {
		let tmpArr = []
		for (let i = 0; i < l.length; i++) {
			if (i === index) {
				tmpArr.push(newE)
				continue
			}
			tmpArr.push(l[i])
		}
		return tmpArr
	}
	const startEditingValues = (e, setEditAttribute, possibleAttributes, setPossibleAttributes) =>
		(() => {
			const value = e.target.value
			let tmpArr = []
			for (let i in possibleAttributes) {
				if (possibleAttributes[i].name === value) {
					tmpArr = possibleAttributes[i].possibilities
				}
			}
			setEditAttribute([true, value, tmpArr])
			setPossibleAttributes(prev => {
				let tmpArr2 = prev
				tmpArr2 = tmpArr2.filter(el => !(el.name === value))
				return tmpArr2
			})
		})()
	const setFileDataString = (v, i2, setFileData, index) =>
		setFileData(prev => {
			let tmpArr2 = prev
			let tmpObj = tmpArr2[index]
			tmpObj = {
				...tmpObj,
				[v.name]: v.possibilities[i2]
			}
			return _replaceObjectElementInArrayAtIndex(tmpArr2, index, tmpObj)
		})
	const setFileDataBoolean = (v, setFileData, index) =>
		setFileData(prev => {
			let tmpObj = prev[index]
			const { [v.name]: val, ...rest } = tmpObj /* eslint-disable-line no-unused-vars */
			if (prev[index][v.name]) {
				tmpObj = rest
				return _replaceObjectElementInArrayAtIndex(prev, index, tmpObj)
			}
			tmpObj = { ...tmpObj, [v.name]: true }
			return _replaceObjectElementInArrayAtIndex(prev, index, tmpObj)
		})
	const setFileDataNumber = (e, v, setFileData, index) =>
		setFileData(prev => {
			let tmpObj = prev[index]
			const { [v.name]: val, ...rest } = tmpObj /* eslint-disable-line no-unused-vars */
			if (e.target.value === "0") {
				tmpObj = rest
				return _replaceObjectElementInArrayAtIndex(prev, index, tmpObj)
			}
			tmpObj = {
				...tmpObj,
				[v.name]: Number(e.target.value)
			}
			return _replaceObjectElementInArrayAtIndex(prev, index, tmpObj)
		})
	const resetChoice = (v, setFileData, index) =>
		setFileData(prev => {
			let tmpObj = prev[index]
			const { [v.name]: val, ...rest } = tmpObj /* eslint-disable-line no-unused-vars */
			tmpObj = rest
			return _replaceObjectElementInArrayAtIndex(prev, index, tmpObj)
		})
	return (
		<ErrorBoundary level='frame'>
			<article>
				<h4>{v.name + " | (" + v.type + ")"}</h4>
				{(() => {
					switch (v.type) {
						case "string":
							return (
								<>
									{(() => {
										let tmpArr = []
										for (let i2 in v.possibilities) {
											tmpArr = [
												...tmpArr,
												<section key={i2}>
													<label htmlFor={"artN2-" + i}>
														{v.possibilities[i2]}
													</label>
													<input
														id={"artN2-" + i}
														type='radio'
														name={v.name}
														checked={
															(fileData[index][v.name] ===
																v.possibilities[i2]) |
															undefined
														}
														onChange={() =>
															setFileDataString(
																v,
																i2,
																setFileData,
																index
															)
														}
													/>
												</section>
											]
										}
										return tmpArr
									})()}
									<button
										disabled={!fileData[index][v.name]}
										onClick={() => resetChoice(v, setFileData, index)}>
										Suprimmer le choix
									</button>
									<button
										value={v.name}
										onClick={e =>
											startEditingValues(
												e,
												setEditAttribute,
												possibleAttributes,
												setPossibleAttributes
											)
										}>
										Modifier les valeurs
									</button>
								</>
							)
						case "boolean":
							return (
								<>
									<label htmlFor={"artN3-" + i}>{v[i]}</label>
									<input
										id={"artN3-" + i}
										type='checkbox'
										name={v.name}
										checked={fileData[index][v.name] | false}
										onChange={() => setFileDataBoolean(v, setFileData, index)}
									/>
								</>
							)
						case "number":
							return (
								<>
									<label htmlFor={"artN4-" + i}>{v[i]}</label>
									<input
										id={"artN4-" + i}
										type='number'
										name={v.name}
										value={fileData[index][v.name] | 0}
										onChange={e => setFileDataNumber(e, v, setFileData, index)}
										min='0'
									/>
								</>
							)
					}
				})()}
			</article>
		</ErrorBoundary>
	)
}
AttributeSelectionFrame.propTypes = {
	index: PropTypes.number.isRequired,
	v: PropTypes.exact({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		possibilities: PropTypes.arrayOf(PropTypes.string)
	}).isRequired,
	i: PropTypes.number.isRequired
}
