import RecipeModel from '../classes/RecipeModel.js'

function recipeFactory(recipie) {
	return new RecipeModel(recipie)
}

export default recipeFactory
