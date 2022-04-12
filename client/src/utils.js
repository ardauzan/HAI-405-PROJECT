/* eslint-disable no-console */

import axios from "axios"

export const uploadImagesToBackend = selectedImages => {
	console.time("uploadImagesToBackend")
	const formData = new FormData()
	const len = selectedImages.length
	for (let i = 0; i < len; i++) {
		formData.append("image", selectedImages[i], "image-" + (i + 1) + ".png")
	}
	let tmpArr = []
	for (let i = 0; i < len; i++) {
		tmpArr.push({})
	}
	return axios
		.put("api/uploadimages", formData)
		.then(res => {
			console.info("status:", res.status)
			return tmpArr
		})
		.catch(e => {
			console.error(e)
			//return "500"
			return tmpArr
		})
		.finally(() => {
			console.timeEnd("uploadImagesToBackend")
		})
}

export const uploadConfigToBackend = selectedConfig => {
	console.time("uploadConfigToBackend")
	axios.put("api/uploadconfig", JSON.stringify({ rows: 2, columns: 3, data: selectedConfig }))
		.then(res => {
			console.info(res)
			return selectedConfig
		})
		.catch(e => {
			console.error(e)
			//return null
			return selectedConfig
		})
		.finally(() => {
			console.timeEnd("uploadConfigToBackend")
		})
}

export const replaceObjectElementInArray = (l, index, newE) => {
	console.time("replaceObjectElementInArray")
	let tmpArr = []
	for (let i = 0; i < l.length; i++) {
		if (i === index) {
			tmpArr.push(newE)
			continue
		}
		tmpArr.push(l[i])
	}
	console.timeEnd("replaceObjectElementInArray")
	return tmpArr
}
