import { textFormatter } from './Utils.js'
// returns the result of the main search (name || description || ingredients)
/*
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
}*/
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
		// console.log(recipie.ingredientsArray)

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
	const ingredientTest = (ingredient) => {
		textFormatter(ingredient) === textFormatter(elemTag)
	}

	return receipies.filter(
		(recipie) => {
			const result =
				textFormatter(recipie.appliance) === textFormatter(elemTag) ||
				recipie.ustensils.includes(elemTag) ||
				recipie.ingredientsArray.includes(elemTag)
			return result
		}
		// return recipie.ingredientsArray.some(ingredientTest)
	)
}

/*
wrie the equivalkent of a filter function with native loops 

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var filtered = [];
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    filtered.push(numbers[i]);
  }
}
console.log(filtered)

*/
