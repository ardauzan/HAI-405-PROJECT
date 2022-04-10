import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import {
	fileDataState,
	addAttributeOpenState,
	indexState,
	possibleAttributesState
} from "../../../store"

export default function AttributeSelectorCard() {
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const setAddAttributeOpen = useSetRecoilState(addAttributeOpenState)
	const index = useRecoilValue(indexState)
	const possibleAttributes = useRecoilValue(possibleAttributesState)
	return (
		<article>
			<h3>Attribute Selector</h3>
			{possibleAttributes.map((v, i) => {
				switch (v.type) {
					case "string":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{(() => {
									let tmpArr = []
									for (let i = 0; i < v.possibilities; i++) {
										tmpArr = [
											...tmpArr,
											<div key={i}>
												<label htmlFor={"artN2-" + i}>{v[i]}</label>
												<input
													id={"artN2-" + i}
													type="radio"
													name={v.name}
													onInput={() => {
														setFileData((prev) => {
															let tmpArr2 = prev
															let tmpObj = tmpArr2[i]
															tmpObj = {
																...tmpObj,
																[v.name]: v.possibilities[i][0]
															}
															tmpArr2[i] = tmpObj
															return tmpArr2
														})
													}}
												/>
											</div>
										]
									}
									return tmpArr
								})()}
							</div>
						)
					case "boolean":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{(() => (
									<>
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
													tmpArr3[index] = tmpObj
													return tmpArr3
												})
											}}
										/>
									</>
								))()}
							</div>
						)
					case "number":
						return (
							<div key={i}>
								<h4>{v.name + " | (" + v.type + ")"}</h4>
								{(() => (
									<>
										<label htmlFor={"artN4-" + i}>{v[i]}</label>
										<input
											id={"artN4-" + i}
											type="number"
											name={v[i]}
											onInput={(e) => {
												setFileData((prev) => {
													let tmpArr2 = prev
													let tmpObj = tmpArr2[index] ? tmpArr2[index] : {}
													tmpObj = { ...tmpObj, [v.name]: e.target.v }
													tmpArr2[index] = tmpObj
													return tmpArr2
												})
											}}
											min="0"
										/>
									</>
								))()}
							</div>
						)
				}
			})}
			<h5>Or add another one:</h5>
			<button onClick={() => setAddAttributeOpen(true)}>Add attribute!</button>
			<button onClick={() => console.log(fileData, possibleAttributes)}>
				log
			</button>
		</article>
	)
}
