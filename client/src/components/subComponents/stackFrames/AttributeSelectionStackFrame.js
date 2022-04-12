import PropTypes from "prop-types"
import { useRecoilState, useRecoilValue } from "recoil"
import { fileDataState, indexState } from "../../../store"
import { replaceObjectElementInArray } from "../../../utils"

export default function AttributeSelectionChoiceStackFrame({ v, i }) {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const index = useRecoilValue(indexState)
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
											(fileData[index][v.name] === v.possibilities[i2]) |
											undefined
										}
										onChange={() => {
											setFileData(prev => {
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
							setFileData(prev => {
								let tmpArr2 = prev
								let tmpObj = tmpArr2[index]
								tmpObj = {
									...tmpObj,
									[v.name]: ""
								}
								return replaceObjectElementInArray(tmpArr2, index, tmpObj)
							})
						}>
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
							checked={fileData[index][v.name] | false}
							onChange={() => {
								setFileData(prev => {
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
							value={fileData[index][v.name] | 0}
							onChange={e => {
								setFileData(prev => {
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

AttributeSelectionChoiceStackFrame.propTypes = {
	v: PropTypes.exact({
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		possibilities: PropTypes.arrayOf(PropTypes.string)
	}).isRequired,
	i: PropTypes.number.isRequired
}
