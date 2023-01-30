import OptionsModel from "../classes/OptionsModel.js"
import { recipes } from "../../data/recipes.js"

export const recipeMockData = (options) => {
	// get data from mock filesystem
	return recipes
}

class RecipeFactory {
	constructor(options) {
		this.options = options
		this.recipes = recipeMockData(new OptionsModel(this.options))
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
			case "name":
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

export default RecipeFactory
