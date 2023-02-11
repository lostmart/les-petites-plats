import { textFormatter } from './Utils.js'
// returns the result of the main search (name || description || ingredients)
export const mainSeacrh = (receipies, value) => {
	const ingredientTest = (ingredient) => {
		textFormatter(ingredient).includes(textFormatter(value))
	}
	return receipies.filter(
		(recipie) =>
			recipie.name.toLowerCase().includes(textFormatter(value)) ||
			recipie.description.toLowerCase().includes(textFormatter(value)) ||
			recipie.ingredientsArray.some(ingredientTest)
	)
}

export const inputsfilter = (array, value) => {
	const result = array.filter((word) => word.includes(value))
	return result
}

// no se che ...
export function filterByTags(receipies, elemTag) {
	const ingredientTest = (ingredient) => {
		textFormatter(ingredient) === textFormatter(elemTag)
	}

	return receipies.filter(
		(recipie) => {
			const includes = recipie.ustensils.includes(elemTag)
			const result =
				textFormatter(recipie.appliance) === textFormatter(elemTag) ||
				recipie.ustensils.includes(elemTag)
			return result
		}
		// return recipie.ingredientsArray.some(ingredientTest)
	)
}
