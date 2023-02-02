/*
----   this function return an object with three arrays
----   the data in each array is lowercased and not duplicated
*/
let ingredientsArray = [] // data for all the ingredients
let utencilesArray = [] // data for all the utelciles
let appliancesArray = [] // data for all the appliances

// pushes the ingredients, appliances & utenciles only if it's not already in the list
const setItems = (recipData, arrayName) => {
	if (arrayName === 'ingredientsArray') {
		recipData.forEach((ing) => {
			if (!ingredientsArray.includes(ing.ingredient.trim().toLowerCase())) {
				ingredientsArray.push(ing.ingredient.trim().toLowerCase())
			}
		})
	}
	if (arrayName === 'utensilsArray') {
		recipData.forEach((util) => {
			if (!utencilesArray.includes(util.trim().toLowerCase())) {
				utencilesArray.push(util.trim().toLowerCase())
			}
		})
	}

	if (arrayName === 'applianceArray') {
		if (!appliancesArray.includes(recipData.trim().toLowerCase())) {
			appliancesArray.push(recipData.trim().toLowerCase())
		}
	}

	// console.log({ ingredientsArray, appliancesArray, utencilesArray })
	return { ingredientsArray, appliancesArray, utencilesArray }
}

export default setItems
