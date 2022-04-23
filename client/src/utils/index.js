/* eslint-disable no-console */
import { Navigate } from "react-router-dom"
import axios from "axios"
import { uploadImagesToBackend, uploadConfigToBackend, resetBackend } from "./apiCalls"
export const _renderAsyncContent = (internalServerErrorCaught, content) =>
	!internalServerErrorCaught ? content : <Navigate to='/500' />
export const _hostIsLocal = () => location.hostname === "localhost" || location.hostname === "127.0.0.1"
export const _buildAllPossibleChoicesArray = gameData => {
	let tmpObj = {}
	for (let i = 0; i < gameData.length; i++)
		for (let e in gameData[i])
			switch (typeof gameData[i][e]) {
				case "string":
					if (!tmpObj[e]) tmpObj[e] = { type: "string", possibilities: [] }
					if (!tmpObj[e].possibilities.includes(gameData[i][e]))
						tmpObj[e].possibilities.push(gameData[i][e])
					break
				case "boolean":
					if (!tmpObj[e]) tmpObj[e] = { type: "boolean" }
					break
				case "number":
					if (!tmpObj[e]) tmpObj[e] = { type: "number" }
			}
	return tmpObj
}
const __endpointCall = (status, callback, fallback) => (status ? callback() : fallback())
export const _uploadImagesToBackend = async (selectedImages, setFileData, setInternalServerErrorCaught) => {
	const res = await uploadImagesToBackend(selectedImages)
	return __endpointCall(
		!(typeof res === "string"),
		() => setFileData(res),
		() => setInternalServerErrorCaught(true)
	)
}
export const _uploadConfigToBackend = async (fileData, setInternalServerErrorCaught, _startOver) => {
	const res = await uploadConfigToBackend(fileData)
	return __endpointCall(
		!(typeof res === "string"),
		() => _startOver(),
		() => setInternalServerErrorCaught(true)
	)
}
export const _resetBackend = async (setInternalServerErrorCaught, setFileData) => {
	const res = await resetBackend()
	return __endpointCall(
		!(typeof res === "string"),
		async () => {
			const data = await axios.get("config.json").then(res => res.data)
			setFileData(data)
		},
		() => setInternalServerErrorCaught(true)
	)
}
export const _startOver = (setPossibleAttributes, setFileData, setIndex) => {
	setPossibleAttributes([])
	setFileData([])
	setIndex(0)
}
export const _canNotFinishDefining = (newAttribute, newStringAttributePossibleValues, possibleAttributes) =>
	!newAttribute.name ||
	!/^[A-Za-z]+$/.test(newAttribute.name) ||
	(newAttribute.type === "string" &&
		Object.values(newStringAttributePossibleValues).filter(i => i !== "" && /^[A-Za-z]+$/.test(i)).length < 2) ||
	(() => {
		const tmpArr = Object.values(newStringAttributePossibleValues).filter(i => i !== "")
		const tmpSet = new Set(tmpArr)
		return tmpSet.size < tmpArr.length
	})() ||
	(() => {
		for (let i = 0; i < possibleAttributes.length; i++)
			if (possibleAttributes[i].name === newAttribute.name) return true
		return false
	})() ||
	(() => {
		const tmpArr = Object.values(newStringAttributePossibleValues).filter(i => i !== "")
		for (let i = 0; i < tmpArr.length; i++) {
			if (tmpArr[i] === newAttribute.name) return true
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
	})(type === "add")
		? setDefineAttributeOpen(false)
		: setDefineAttributeOpen([false, "", []])
}

export const _parseAllQuestions = (v, allQuestions) => {
	console.log(v, allQuestions)
	return true
}
