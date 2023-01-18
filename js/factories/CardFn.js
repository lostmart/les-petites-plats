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

// handle lists click
function handleListClick(value) {
	const filters_container = document.querySelector('[data-filters]')
	checkIncludes(value, ingredientsArrayFilter)
	//filters_container.textContent = ""

	//filters_container.append(filterBtn(value))
	console.log(ingredientsArrayFilter)
}

function filterBtn(listValue) {
	const data_filter_btn = document.querySelector('[data-filter-btn]')
	const listDom = data_filter_btn.content.cloneNode(true).children[0]
	listDom.setAttribute('data-btn-filter', 'ingredients')
	const btnImg = listDom.querySelector('img')
	const span = listDom.querySelector('span')
	span.textContent = listValue
	listDom.prepend(span)
	// BIIIIG HERE !!!
	// wrong value being passed !
	listDom.addEventListener('click', (e) => {
		const itemValue = e.target.textContent
		removeItem(itemValue, ingredientsArrayFilter)
	})
	btnImg.addEventListener('click', (e) => {
		e.stopPropagation()
		const itemValue = span.textContent
		removeItem(itemValue, ingredientsArrayFilter)
	})
	return listDom
}

// remove an element from filter list
function removeItem(itemValue, itemsArray) {
	console.log(itemValue)
	const itemIndx = itemsArray.indexOf(itemValue)
	const btns_nodes = document.querySelectorAll(
		'[data-btn-filter="ingredients"]'
	)
	if (itemIndx > 0) {
		itemsArray.splice(itemIndx, 1)
		btns_nodes[itemIndx].remove()
		// console.log(btns_nodes[itemIndx])
	}
}

// checks if value is repetaed and then adds it to an array
// accepts a value(String) and an Array
// it also adds the button to the DOM if necessary
function checkIncludes(value, arrayType) {
	const filters_container = document.querySelector('[data-filters]')
	if (!arrayType.includes(value)) {
		arrayType.push(value)
		if (arrayType === ingredientsArrayFilter) {
			filters_container.append(filterBtn(value))
		}
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
			handleListClick(e.target.textContent)
		})
		li.textContent = element
		ul.append(li)
	})
	return ul
}

export default domCard
