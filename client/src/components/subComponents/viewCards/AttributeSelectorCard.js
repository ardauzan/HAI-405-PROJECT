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
	const possibleAttributes = useRecoilValue(possibleAttributesState)
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
										let tmpArr3 = prev
										let tmpObj = tmpArr3[index]
										tmpObj = { ...tmpObj, [v.name]: !prev[index][v.name] }
										return replaceObjectElementInArray(tmpArr3, index, tmpObj)
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
										let tmpArr2 = prev
										let tmpObj = tmpArr2[index] ? tmpArr2[index] : {}
										tmpObj = {
											...tmpObj,
											[v.name]: Number(e.target.value)
										}
										return replaceObjectElementInArray(tmpArr2, index, tmpObj)
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
			{possibleAttributes.map((v, i) => (
				<Choice key={i} v={v} i={i} />
			))}
			<h5>Or add another one:</h5>
			<button onClick={() => setAddAttributeOpen(true)}>Add attribute!</button>
			<button onClick={() => console.log(fileData, possibleAttributes, index)}>
				log
			</button>
		</article>
	)
}
