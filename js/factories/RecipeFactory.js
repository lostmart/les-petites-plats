import RecipeModel from '../classes/RecipeModel.js'
import setItems from './DataArrays.js'

function recipeFactory(recipie) {
	if (recipie.ingredients) {
		setItems(recipie.ingredients, 'ingredientsArray')
	}

	return new RecipeModel(recipie)
}

export default recipeFactory
