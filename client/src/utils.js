import axios from "axios"

export const uploadImagesToBackend = async (selectedFiles, setFilesChosen) => {
	try {
		const formData = new FormData()
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append("image", selectedFiles[i], "image-" + (i + 1) + ".png")
		}
		const res = await axios.put("api/uploadfiles", formData)
		setFilesChosen(true)
		console.log(res) /* eslint-disable-line no-console */
	} catch (e) {
		setFilesChosen(true)
		console.error(e) /* eslint-disable-line no-console */
	}
}
