class RecipeViewModel {
	constructor(recipe) {
		this.name = recipe?.name ?? ''
		this.ingredients = recipe?.ingredients ?? []
		this.element = recipe?.element ?? ''
	}
}

export default RecipeViewModel
