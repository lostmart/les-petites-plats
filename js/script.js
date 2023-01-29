import RecipeFactory from './factories/RecipeFactory.js'

const receipie = new RecipeFactory([
	'id',
	'ingredients',
	'description',
	'appliance',
])

console.log(receipie);
