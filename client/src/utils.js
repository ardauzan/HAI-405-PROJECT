/* eslint-disable no-console */

import axios from "axios"

export const uploadImagesToBackend = async (selectedImages) => {
	console.log("uploadImagesToBackend firing.")
	const formData = new FormData()
	const len = selectedImages.length
	for (let i = 0; i < len; i++) {
		formData.append("image", selectedImages[i], "image-" + (i + 1) + ".png")
	}
	let tmpArr = []
	for (let i = 0; i < len; i++) {
		tmpArr.push({})
	}
	const res = axios
		.put("api/uploadimages", formData)
		.then((res) => {
			console.info("status:", res.status)
		})
		.catch((e) => {
			console.error("error:", e)
		})
		.finally(() => {
			console.log("uploadImagesToBackend fired.")
		})
	console.log(res)
	return tmpArr
}

export const uploadConfigToBackend = (selectedConfig) => {
	axios
		.put(
			"api/uploadconfig",
			JSON.stringify({ rows: 2, columns: 3, data: selectedConfig })
		)
		.then((res) => {
			console.info(res)
			return selectedConfig
		})
		.catch((e) => {
			console.error(e)
			//return null
			return selectedConfig
		})
}
