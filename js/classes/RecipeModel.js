class RecipeModel {
	constructor({
		appliance,
		description,
		id,
		ingredients,
		name,
		servings,
		time,
		ustensils,
	}) {
		this.appliance = appliance ?? null
		this.description = description ?? null
		this.id = id ?? null
		this.ingredients = ingredients ?? null
		this.name = name.toLowerCase() ?? null
		this.servings = servings ?? null
		this.time = time ?? null
		this.ustensils = ustensils ?? null
	}
	get ingredientsArray() {
		let arr = []
		this.ingredients.forEach((ing) => arr.push(ing.ingredient))
		return arr
	}
}

export default RecipeModel
