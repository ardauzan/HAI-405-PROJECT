// ! import redirect coomponent
import { Navigate } from "react-router-dom"
// ! import api calls
import { uploadImagesToBackend, uploadConfigToBackend } from "./apiCalls"
// note logic is defined in respective order to levels of execution. First run -> First defined
// note shared logic is defined in the shared section of the lowest level that depends on it.
// note shared internal logic that is not exposed to outside modules is defined in the [internal] section of the lowest level that depends on it.
// note shared external logic that is exposed to outside modules is defined in the [external] section of the lowest level that depends on it.
//level (fallback) | (Page) ##########################################
// shared #####################
export const _renderAsyncContent = (internalServerErrorCaught, content) =>
	!internalServerErrorCaught ? content : <Navigate to='/500' />
// level (base) | (View)
// internal #####################
const __endpointCall = (status, callback, fallback) => (status ? callback() : fallback())
// external #####################
export const _uploadImagesToBackend = async (selectedImages, setFileData, setInternalServerErrorCaught) => {
	const res = await uploadImagesToBackend(selectedImages)
	return __endpointCall(
		!(typeof res === "string"),
		() => setFileData(res),
		() => setInternalServerErrorCaught(true)
	)
}
export const _uploadConfigToBackend = async (fileData, setInternalServerErrorCaught) => {
	const res = await uploadConfigToBackend(fileData)
	return __endpointCall(
		!(typeof res === "string"),
		() => console.log(res),
		() => setInternalServerErrorCaught(true)
	)
}
// level (generic) | (card) ##########################################
// shared #####################
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
// level (grid) | (stack)
// level (cell) | (frame)
