import { recipes } from "../../data/recipes.js"
import RecipeFactory from "./factories/RecipeFactory.js"

// array of all the receipies
let receipiesArray = []

recipes.forEach((recipe) => {
	const { id, name, ingredients } = recipe
	const newRecip = new RecipeFactory([id, name, ingredients])
	console.log(newRecip)
})
