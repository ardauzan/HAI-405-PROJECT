// ! import redirect coomponent
import { Navigate } from "react-router-dom"
// ! import utility functions and api calls
import { replaceObjectElementInArrayAtIndex } from "./utils"
import { uploadImagesToBackend, uploadConfigToBackend } from "./apiCalls"

// ! All Frontend logic is located here.

// note logic is defined in respective order to levels of execution. First run -> First defined
// note shared logic is defined in the shared section of the lowest level that depends on it.
// note shared internal logic that is not exposed to outside modules is defined in the internal section of the lowest level that depends on it.

//level (fallback) | (Page)

// shared

export const _renderAsyncContent = (internalServerErrorCaught, content) =>
	!internalServerErrorCaught ? content : <Navigate to='/500' />
// * InternalServerError

// * Loading

// * PageNotFound

// * Game

// * Generator

export const _renderGeneratorViews = (filesSelected, fileSelection, attributeSelection) =>
	!filesSelected ? fileSelection : attributeSelection

// * Home

// level (base) | (View)

// internal

const __endpointCall = (status, callback, fallback) => (status ? callback() : fallback())

// shared

// * Footer

// * Header

// * FileSelection

export const _canNotUploadImagesToBackend = selImLen => selImLen < 6 || selImLen > 24

export const _uploadImagesToBackend = async (selectedImages, setFileData, setInternalServerErrorCaught) => {
	const res = await uploadImagesToBackend(selectedImages)
	return __endpointCall(
		!(typeof res === "string"),
		() => setFileData(res),
		() => setInternalServerErrorCaught(true)
	)
}

export const _setSelectedImages = (e, setSelectedImages) => setSelectedImages([...e.target.files])

// * AttributeSelection
export const _imageData = index => [index + 1, "image-" + (index + 1), "images/image-" + (index + 1) + ".png"]

export const _renderAttributeSelectionContent = (
	addAttributeOpen,
	editAttributeOpen,
	attributeSelectorCard,
	editAttributeCard,
	addAttributeCard
) => (!addAttributeOpen ? (!editAttributeOpen ? attributeSelectorCard : editAttributeCard) : addAttributeCard)

export const _previousImage = (index, setIndex) => (index > 0 ? setIndex(prev => prev - 1) : null)

export const _nextImageOrFinishData = (index, setIndex, filesCount, fileData, setInternalServerErrorCaught) =>
	index + 1 < filesCount
		? [() => setIndex(prev => prev + 1), "Next image!"]
		: [
				async () => {
					const res = await uploadConfigToBackend(fileData)
					return __endpointCall(
						!(typeof res === "string"),
						() => console.log(res),
						() => setInternalServerErrorCaught(true)
					)
				},
				"Submit attributes!"
		  ]

export const _startOver = (setPossibleAttributes, setFileData, setIndex) => {
	setPossibleAttributes([])
	setFileData([])
	setIndex(0)
}

// level (generic) | (card)

// shared

export const _canNotFinishDefining = (newAttribute, newStringAttributePossibleValues, possibleAttributes) =>
	!newAttribute.name ||
	!/^[A-Za-z]+$/.test(newAttribute.name) ||
	Object.values(newStringAttributePossibleValues).filter(i => i !== "" && !/^[A-Za-z]+$/.test(i)).length ||
	(newAttribute.type === "string" && Object.values(newStringAttributePossibleValues).filter(i => i !== "").length < 1) ||
	(() => {
		const tmpArr = Object.values(newStringAttributePossibleValues).filter(i => i !== "")
		const tmpSet = new Set(tmpArr)
		return tmpSet.size < tmpArr.length
	})() ||
	(() => {
		for (let i = 0; i < possibleAttributes.length; i++) {
			if (possibleAttributes[i].name === newAttribute.name) {
				return true
			}
		}
		return false
	})() ||
	(() => {
		const tmpArr = Object.values(newStringAttributePossibleValues).filter(i => i !== "")
		for (let i = 0; i < tmpArr.length; i++) {
			if (tmpArr[i] === newAttribute.name) {
				return true
			}
		}
		return false
	})()

export const _finishDefining = (
	newAttribute,
	setPossibleAttributes,
	newStringAttributePossibleValues,
	setDefineAttributeOpen,
	type
) => {
	setPossibleAttributes(prev => {
		return [
			...prev,
			(() =>
				newAttribute.type === "string"
					? {
							...newAttribute,
							possibilities: Object.values(newStringAttributePossibleValues).filter(i =>
								i ? !/^ *$/.test(i) : false
							)
					  }
					: newAttribute)()
		]
	})
	type === "add" ? setDefineAttributeOpen(false) : setDefineAttributeOpen([false, "", []])
}

// * FileSelector

export const _renderFileSelectorText = selectedFileCount =>
	selectedFileCount >= 6 && selectedFileCount <= 24
		? ["Selection Details", `Amount of images chosen: ${selectedFileCount}`]
		: ["Invalid selection", "Choose image files to use. (At least 6, at most 24)"]

// * AttributeSelector

// * AddAttribute

export const _setAttr = ([setNewAttribute, key], e) =>
	setNewAttribute(prev => {
		return {
			...prev,
			[key]: e.target.value
		}
	})

// internal (EditAttribute)

/*
const __unsetDeletedStringPossibilitiesInFileArray = (setFileData, possibleAttributes) => {
	// ! #########################################3####################
} */

// * EditAttribute

export const _finishEditing = (
	setFileData,
	newAttribute,
	possibleAttributes,
	setPossibleAttributes,
	newStringAttributePossibleValues,
	setEditAttribute
) => {
	_finishDefining(newAttribute, setPossibleAttributes, newStringAttributePossibleValues, setEditAttribute, "edit")
}
// level (grid) | (stack)

// * AttributeSelection

export const _renderAttributeSelectionStackContent = (
	possibleAttributes,
	AttributeSelectionFrame,
	setPossibleAttributes,
	fileData,
	setFileData
) =>
	possibleAttributes.map((v, i) => (
		<article key={i}>
			<AttributeSelectionFrame v={v} i={i} />
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
				}}>
				Delete attribute
			</button>
		</article>
	))

// * StringAttributeAddition

// * StringAttributeEditionStack

// level (cell) | (frame)

// internal (AttributeSelection)
const __startEditingValues = (e, setEditAttribute, possibleAttributes, setPossibleAttributes) =>
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

const __setFileDataString = (v, i2, setFileData, index) =>
	setFileData(prev => {
		let tmpArr2 = prev
		let tmpObj = tmpArr2[index]
		tmpObj = {
			...tmpObj,
			[v.name]: v.possibilities[i2]
		}
		return replaceObjectElementInArrayAtIndex(tmpArr2, index, tmpObj)
	})

const __setFileDataBoolean = (v, setFileData, index) =>
	setFileData(prev => {
		let tmpArr = prev
		let tmpObj = tmpArr[index]
		tmpObj = { ...tmpObj, [v.name]: !prev[index][v.name] }
		return replaceObjectElementInArrayAtIndex(tmpArr, index, tmpObj)
	})

const __setFileDataNumber = (e, v, setFileData, index) =>
	setFileData(prev => {
		let tmpArr = prev
		let tmpObj = tmpArr[index] ? tmpArr[index] : {}
		tmpObj = {
			...tmpObj,
			[v.name]: Number(e.target.value)
		}
		return replaceObjectElementInArrayAtIndex(tmpArr, index, tmpObj)
	})

const __resetChoice = (v, setFileData, index) =>
	setFileData(prev => {
		let tmpArr2 = prev
		let tmpObj = tmpArr2[index]
		tmpObj = {
			...tmpObj,
			[v.name]: ""
		}
		return replaceObjectElementInArrayAtIndex(tmpArr2, index, tmpObj)
	})

// * AttributeSelection

export const _renderAttributeSelectionChoiceHeading = v => v.name + " | (" + v.type + ")"

export const _renderAttributeSelectionChoiceContent = (
	v,
	i,
	fileData,
	setFileData,
	possibleAttributes,
	setPossibleAttributes,
	setEditAttribute,
	index
) => {
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
										type='radio'
										name={v.name}
										checked={
											(fileData[index][v.name] === v.possibilities[i2]) |
											undefined
										}
										onChange={() => __setFileDataString(v, i2, setFileData, index)}
									/>
								</section>
							]
						}
						return tmpArr
					})()}
					<button
						disabled={!fileData[index][v.name]}
						onClick={() => __resetChoice(v, setFileData, index)}>
						Reset choice
					</button>
					<button
						value={v.name}
						onClick={e =>
							__startEditingValues(
								e,
								setEditAttribute,
								possibleAttributes,
								setPossibleAttributes
							)
						}>
						Edit values
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
						onChange={() => __setFileDataBoolean(v, setFileData, index)}
					/>
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
							type='number'
							name={v.name}
							value={fileData[index][v.name] | 0}
							onChange={e => __setFileDataNumber(e, v, setFileData, index)}
							min='0'
						/>
					</section>
				</>
			)
	}
}
