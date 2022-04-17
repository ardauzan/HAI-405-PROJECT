import { atom, selector } from "recoil"

export const fileDataState = atom({
	key: "fileDataState",
	default: []
})

export const internalServerErrorCaughtState = atom({
	key: "internalServerErrorCaughtState",
	default: false
})

export const addAttributeOpenState = atom({
	key: "addAttributeOpenState",
	default: false
})

export const editAttributeState = atom({
	key: "editAttributeState",
	default: [false, "", []]
})

export const editAttributeOpenState = selector({
	key: "editAttributeOpenState",
	get: ({ get }) => {
		const editAttributeOpen = get(editAttributeState)
		return editAttributeOpen[0]
	}
})

export const attributeSelectedForEditingState = selector({
	key: "attributeSelectedForEditingState",
	get: ({ get }) => {
		const editAttributeOpen = get(editAttributeState)
		return editAttributeOpen[1]
	}
})

export const possibleValuesSelectedForEditingState = selector({
	key: "possibleValuesSelectedForEditingState",
	get: ({ get }) => {
		const editAttributeOpen = get(editAttributeState)
		return editAttributeOpen[2]
	}
})

export const indexState = atom({
	key: "indexState",
	default: 0
})

export const possibleAttributesState = atom({
	key: "possibleAttributesState",
	default: []
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
