import { textFormatter } from './Utils.js'
// returns the result of the main search (name || description || ingredients)

export const mainSeacrh = (receipies, value) => {
	const result = []
	for (let i = 0; i < receipies.length; i++) {
		const recipie = receipies[i]
		if (
			recipie.description.toLowerCase().includes(textFormatter(value)) ||
			recipie.name.toLowerCase().includes(textFormatter(value))
		) {
			result.push(recipie)
		}

		for (let ii = 0; ii < recipie.ingredientsArray.length; ii++) {
			const ing = recipie.ingredientsArray[i]
			if (ing && ing.includes(textFormatter(value))) {
				result.push(recipie)
			}
		}

		//console.log(recipie.ingredientsArray.forEach((ing) => console.log(ing)))
	}
	return result
}

export const inputsfilter = (array, value) => {
	const result = array.filter((word) => word.includes(value))
	return result
}

// filter based on the tags ( ingredients, appliances, ustensils )
export function filterByTags(receipies, elemTag) {
	const result = []
	for (let i = 0; i < receipies.length; i++) {
		const recipie = receipies[i]
		if (
			textFormatter(recipie.appliance) === textFormatter(elemTag) ||
			recipie.ustensils.includes(textFormatter(elemTag))
		) {
			result.push(recipie)
		}

		let ii = 0
		while (ii < recipie.ingredientsArray.length) {
			const ing = recipie.ingredientsArray[ii]
			ii++
			console.log(textFormatter(ing), textFormatter(elemTag))
			if (textFormatter(ing) === textFormatter(elemTag)) {
				result.push(recipie)
			}
		}
	}
	return result
}
