import RecipeModel from '../classes/RecipeModel.js' // class for instanciating a recipe object
import setItems from './DataArrays.js' // factory fn to create three array with: ingredients, utensiles, appliances

function recipeFactory(recipe) {
	if (recipe.ingredients) {
		setItems(recipe.ingredients, 'ingredientsArray')
	}
	if (recipe.ustensils) {
		setItems(recipe.ustensils, 'utensilsArray')
	}
	if (recipe.appliance) {
		setItems(recipe.appliance, 'applianceArray')
	}

	return new RecipeModel(recipe)
}

export default recipeFactory
