/* eslint-disable no-console */

import axios from "axios"

export const uploadImagesToBackend = (selectedFiles, setFilesChosen) => {
	const formData = new FormData()
	for (let i = 0; i < selectedFiles.length; i++) {
		formData.append("image", selectedFiles[i], "image-" + (i + 1) + ".png")
	}
	axios
		.put("api/uploadimages", formData)
		.then((res) => {
			console.info(res)
			setFilesChosen(true)
		})
		.catch((e) => {
			console.error(e)
			setFilesChosen(true)
		})
}

export const uploadConfigToBackend = (setFilesChosen, attributes) => {
	axios
		.put(
			"api/uploadconfig",
			JSON.stringify({ rows: 2, columns: 3, data: attributes })
		)
		.then(setFilesChosen(false))
		.catch((e) => {
			console.error(e)
		})
}
