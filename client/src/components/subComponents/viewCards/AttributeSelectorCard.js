import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import PropTypes from "prop-types"
import {
	fileDataState,
	addAttributeOpenState,
	indexState,
	possibleAttributesState
} from "../../../store"

import { replaceObjectElementInArray } from "../../../utils"

export default function AttributeSelectorCard() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	const index = useRecoilValue(indexState)
	const [possibleAttributes, setPossibleAttributes] = useRecoilState(
		possibleAttributesState
	)
	const Choice = ({ v, i }) => {
		switch (v.type) {
			case "string":
				return (
					<>
						<h4>{v.name + " | (" + v.type + ")"}</h4>
						{(() => {
							let tmpArr = []
							for (let i2 in v.possibilities) {
								tmpArr = [
									...tmpArr,
									<section key={i2}>
										<label htmlFor={"artN2-" + i}>{v.possibilities[i2]}</label>
										<input
											id={"artN2-" + i}
											type="radio"
											name={v.name}
											checked={
												fileData[index][v.name] &&
												fileData[index][v.name] === v.possibilities[i2]
											}
											onChange={() => {
												setFileData((prev) => {
													let tmpArr2 = prev
													let tmpObj = tmpArr2[index]
													tmpObj = {
														...tmpObj,
														[v.name]: v.possibilities[i2]
													}
													return replaceObjectElementInArray(
														tmpArr2,
														index,
														tmpObj
													)
												})
											}}
										/>
									</section>
								]
							}
							return tmpArr
						})()}
						<button
							disabled={!fileData[index][v.name]}
							onClick={() =>
								setFileData((prev) => {
									let tmpArr2 = prev
									let tmpObj = tmpArr2[index]
									tmpObj = {
										...tmpObj,
										[v.name]: ""
									}
									return replaceObjectElementInArray(tmpArr2, index, tmpObj)
								})
							}
						>
							Reset choice
						</button>
					</>
				)
			case "boolean":
				return (
					<>
						<h4>{v.name + " | (" + v.type + ")"}</h4>
						<section>
							<label htmlFor={"artN3-" + i}>{v[i]}</label>
							<input
								id={"artN3-" + i}
								type="checkbox"
								name={v.name}
								onInput={() => {
									setFileData((prev) => {
										let tmpArr = prev
										let tmpObj = tmpArr[index]
										tmpObj = { ...tmpObj, [v.name]: !prev[index][v.name] }
										return replaceObjectElementInArray(tmpArr, index, tmpObj)
									})
								}}
							/>
						</section>
					</>
				)
			case "number":
				return (
					<>
						<h4>{v.name + " | (" + v.type + ")"}</h4>
						<section>
							<label htmlFor={"artN4-" + i}>{v[i]}</label>
							<input
								id={"artN4-" + i}
								type="number"
								name={v.name}
								onInput={(e) => {
									setFileData((prev) => {
										let tmpArr = prev
										let tmpObj = tmpArr[index] ? tmpArr[index] : {}
										tmpObj = {
											...tmpObj,
											[v.name]: Number(e.target.value)
										}
										return replaceObjectElementInArray(tmpArr, index, tmpObj)
									})
								}}
								min="0"
							/>
						</section>
					</>
				)
		}
	}

	Choice.propTypes = {
		v: PropTypes.exact({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			possibilities: PropTypes.arrayOf(PropTypes.string)
		}).isRequired,
		i: PropTypes.number.isRequired
	}

	return (
		<article>
			<h3>Attribute Selector</h3>
			<section>
				<h4>Select attibutes for image:</h4>
				{possibleAttributes.map((v, i) => (
					<article key={i}>
						<Choice v={v} i={i} />
						<button
							onClick={() => {
								let tmpArr = []
								for (let ii = 0; ii < possibleAttributes.length - 1; ii++) {
									if (possibleAttributes[ii].name !== v.name) {
										tmpArr.push(possibleAttributes[ii])
									}
								}
								setPossibleAttributes(tmpArr)
								tmpArr = []
								for (let ii = 0; ii < fileData.length; ii++) {
									tmpArr.push({})
									for (let iii in fileData[ii]) {
										if (iii === v.name) {
											continue
										}
										tmpArr[ii] = { ...tmpArr[ii], [iii]: fileData[ii][iii] }
									}
								}
								setFileData(tmpArr)
							}}
						>
							Delete attribute
						</button>
					</article>
				))}
			</section>
			<section>
				<h4>Or define a new attribute:</h4>
				<button onClick={() => setAddAttributeOpen(true)}>Define new.</button>
				<button
					onClick={() => console.log(fileData, possibleAttributes, index)}
				>
					log
				</button>
			</section>
		</article>
	)
}
