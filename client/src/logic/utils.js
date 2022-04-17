// ! GENERAL FUNCTIONS

export const replaceObjectElementInArrayAtIndex = (l, index, newE) => {
	let tmpArr = []
	for (let i = 0; i < l.length; i++) {
		if (i === index) {
			tmpArr.push(newE)
			continue
		}
		tmpArr.push(l[i])
	}
	return tmpArr
}
