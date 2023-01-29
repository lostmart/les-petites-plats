import OptionsModel from "../classes/OptionsModel.js"
// import { recipes } from '../../data/recipes.js'

const recipeMockData = (options) => {
	// get data from mock filesystem
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

	getByName(name) {}

	getByAppliance(appliance) {}

	handleSearch({ ingredients, apppliancies }) {
		return {}
	}
}

export default RecipeFactory
