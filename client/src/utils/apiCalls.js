/* eslint-disable no-console */
import axios from "axios"
// info uploadImagesToBackend calls <api/uploadimages> with method <PUT>
export const uploadImagesToBackend = selectedImages => {
	const formData = new FormData()
	const len = selectedImages.length
	let tmpArr = []
	let status = ""
	let er = undefined
	for (let i = 0; i < len; i++) {
		formData.append("image", selectedImages[i], "image-" + (i + 1) + ".png")
	}
	for (let i = 0; i < len; i++) {
		tmpArr.push({})
	}
	return axios
		.put("api/uploadimages", formData)
		.then(res => {
			status = res.status
			return tmpArr
		})
		.catch(e => {
			console.error(e)
			return tmpArr
			//return "500"
		})
		.finally(() => {
			console.assert(status === 200 && er === undefined, "(uploadImagesToBackend) Successful")
		})
}
// info uploadConfigToBackend calls <api/uploadconfig> with method <PUT>
export const uploadConfigToBackend = selectedConfig => {
	let status = ""
	let er = undefined
	return axios
		.put("api/uploadconfig", selectedConfig)
		.then(res => {
			status = res.status
			return selectedConfig
		})
		.catch(e => {
			er = e
			return "500"
		})
		.finally(() => {
			console.assert(status === 200 && er === undefined, "(uploadConfigToBackend) Successful")
		})
}

export const resetBackend = () =>
	axios
		.get("api/resetbackend")
		.then(res => res.status)
		.catch(() => "500")
