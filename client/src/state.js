import { atom, selector } from "recoil"
export const internalServerErrorCaughtState = atom({
	key: "internalServerErrorCaughtState",
	default: false
})
export const gameDataState = atom({
	key: "gameDataState",
	default: []
})
export const gameState = atom({
	key: "gameState",
	default: [false, 0, null, 0]
})
export const allQuestionsState = atom({
	key: "allQuestionsState",
	default: []
})
export const currentQuestionState = atom({
	key: "currentQuestionState",
	default: []
})
export const fileDataState = atom({
	key: "fileDataState",
	default: []
})
export const addAttributeOpenState = atom({
	key: "addAttributeOpenState",
	default: false
})
export const editAttributeState = atom({
	key: "editAttributeState",
	default: [false, "", []]
})
export const possibleAttributesState = atom({
	key: "possibleAttributesState",
	default: []
})
export const gameInSessionState = selector({
	key: "gameInSessionState",
	get: ({ get }) => get(gameState)[0]
})
export const gameModeState = selector({
	key: "gameModeSatate",
	get: ({ get }) => get(gameState)[1]
})
export const editAttributeOpenState = selector({
	key: "editAttributeOpenState",
	get: ({ get }) => get(editAttributeState)[0]
})
export const attributeSelectedForEditingState = selector({
	key: "attributeSelectedForEditingState",
	get: ({ get }) => get(editAttributeState)[1]
})
export const possibleValuesSelectedForEditingState = selector({
	key: "possibleValuesSelectedForEditingState",
	get: ({ get }) => get(editAttributeState)[2]
})
export const filesCountState = selector({
	key: "filesCountState",
	get: ({ get }) => get(fileDataState).length
})
export const filesSelectedState = selector({
	key: "filesSelectedState",
	get: ({ get }) => get(fileDataState).length > 0
})
