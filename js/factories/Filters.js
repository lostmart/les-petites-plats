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
export function filterByTags(receipies, ingrTag) {
	const ingredientTest = (ingredient) => {
		textFormatter(ingredient) === textFormatter(ingrTag)
	}

	return receipies.filter(
		(recipie) => {
			return recipie.appliance.toLowerCase() === ingrTag.toLowerCase()
		}
		// return recipie.ingredientsArray.some(ingredientTest)
	)
}
