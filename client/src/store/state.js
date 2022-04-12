import { atom, selector } from "recoil"

export const fileDataState = atom({
	key: "fileDataState",
	default: []
})

export const internalServerErrorCaughtState = atom({
	key: "internalServerErrorCaughtState",
	default: false
})

export const filesCountState = selector({
	key: "filesCountState",
	get: ({ get }) => {
		const fileData = get(fileDataState)
		return fileData.length
	}
})

export const filesSelectedState = selector({
	key: "filesSelectedState",
	get: ({ get }) => {
		const fileData = get(fileDataState)
		return fileData.length > 0
	}
})

export const addAttributeOpenState = atom({
	key: "addAttributeOpenState",
	default: false
})

export const indexState = atom({
	key: "indexState",
	default: 0
})

export const possibleAttributesState = atom({
	key: "possibleAttributesState",
	default: []
})
