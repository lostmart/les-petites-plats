import OptionsModel from '../classes/OptionsModel.js'
import { recipes } from '../../data/recipes.js'

let ingredientsArray = [] // data for all the ingredients
let appliancesArray = [] // data for all the appliances
let utencilesArray = [] // data for all the utelciles

export const recipeMockData = () => {
	// get data from mock filesystem
	return recipes
}

class RecipeFactory {
	constructor(options) {
		this.options = options
		this.recipes = recipeMockData(new OptionsModel(this.options))
	}
	set ingredients(item) {
		this.ingredients.push(item)
	}

	getRecipes() {
		return this.recipes
	}

	filterByParameters(params) {
		return this.handleFilterByParameters(params)
	}

	handleFilterByParameters(params) {
		// Logic Filter
		switch (params.type) {
			case 'name':
				return this.getByName(params.name)
			default:
				return this.handleSearch(params)
		}
	}

	getByIngredient(ingredient) {}

	getById(id) {}

	getByName(name) {
		return recipes.find((recip) => recip.name.includes(name))
	}

	getByAppliance(appliance) {}

	handleSearch({ ingredients, apppliancies }) {
		return {}
	}
}

// pushes the ingredients, appliances & utenciles only if it's not already in the list
const setItems = () => {
	recipes.forEach((recipie) => {
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
	})
}

setItems()
console.log(ingredientsArray)
console.log(appliancesArray)
console.log(utencilesArray)

export default RecipeFactory
