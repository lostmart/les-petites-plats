import RecipeModel from '../classes/RecipeModel.js'

// ingredients from all the recipies
export let ingredientsArray = []
export let ustensilsArray = []
export let appliance = []

// arrays for filters
let ingredientsArrayFilter = []

//  returns a DOM element ready to append
function domCard(card) {
	// creates an object based on the CardModel class
	const recipe = new RecipeModel(card)
	// template from index.html
	const card_template = document.querySelector('[data-card-template]')

	// elements for the card
	const domCard = card_template.content.cloneNode(true).children[0]
	const cardImg = domCard.querySelector('[data-card-img]')
	const cardTime = domCard.querySelector('[data-card-time]')
	cardTime.children[1].textContent = `${recipe.time} min`
	const cardTitle = domCard.querySelector('.card-title')
	const cardText = domCard.querySelector('.card-text')
	const ul = domCard.querySelector('.list-group')
	// ingredients
	recipe.ingredients.forEach((ingr) => {
		const li = document.createElement('li')
		li.classList.add('list-group-item')
		li.innerHTML = `<strong>${ingr.ingredient}:</strong> ${ingr.quantity} `
		// checks if there is units of measure
		ingr.unit ? (li.innerHTML += ingr.unit) : false
		ul.append(li)
		// add ingredients (not repeated)
		checkIncludes(ingr.ingredient, ingredientsArray)
	})

	// ustensils
	recipe.ustensils.forEach((util) => {
		checkIncludes(util, ustensilsArray)
	})

	//console.log(ingredientsArray)
	//console.log(ustensilsArray)

	cardImg.src = '../assets/bg-img.jpg'
	cardImg.alt = recipe.name
	cardText.textContent = recipe.description.slice(0, 174) + '...'
	cardTitle.textContent = recipe.name

	return domCard
}

function checkIncludes(value, arrayType) {
	if (!arrayType.includes(value)) {
		arrayType.push(value)
	}
}

// will return a ul element filled with items with a class "list-group-item"
export function domLists(elementsArray) {
	const ul = document.createElement('ul')
	ul.classList.add('list-group')
	ul.classList.add('list-group-horizontal')
	ul.classList.add('flex-wrap')
	ul.classList.add('justify-content-around')

	elementsArray.forEach((element) => {
		const li = document.createElement('li')
		li.classList.add('list-group-item')
		li.addEventListener('click', (e) => {
			e.stopPropagation()
			console.log(e.target.textContent)
		})
		li.textContent = element
		ul.append(li)
	})
	return ul
}

export default domCard
