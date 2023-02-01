let ingredientsArray = [] // data for all the ingredients
let appliancesArray = [] // data for all the appliances
let utencilesArray = [] // data for all the utelciles

// pushes the ingredients, appliances & utenciles only if it's not already in the list
const setItems = (recipie, arrayName) => {
	console.log(arrayName)
	recipie.ustensils.forEach((util) => {
		if (!utencilesArray.includes(util)) {
			utencilesArray.push(recipie.appliance)
		}
	})

	if (!appliancesArray.includes(recipie.appliance)) {
		appliancesArray.push(recipie.appliance)
	}

	recipie.ingredients.forEach((ing) => {
		if (!ingredientsArray.includes(ing.ingredient)) {
			ingredientsArray.push(ing.ingredient)
		}
	})
	return { ingredientsArray, appliancesArray, utencilesArray }
}

export default setItems
