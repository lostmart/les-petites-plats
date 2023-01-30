import recipeMockData from './factories/RecipeFactory.js'
import { createCard } from './factories/Utils.js'

const cards_container = document.querySelector('[data-cards-container]')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')
const rechGeneral = document.querySelector('#Rechercher')

//console.log((cards_container.innerHTML = 'el amor'))

// array of all the receipies
let receipiesArray = new recipeMockData([
	'id',
	'name',
	'ingredients',
	'description',
	'ustensils',
	'appliance',
])

let { recipes } = receipiesArray

recipes.forEach((recipie) => cards_container.append(createCard(recipie)))

rechGeneral.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase()
	if (value.length >= 3) {
		console.log(receipiesArray)
	}
})

/*
rechGeneral.addEventListener('keydown', (e) => {
	const value = e.target.value.toLowerCase()
	if (e.key == 'Backspace') {
		populateDom(value)
	}
})

ingredients_btn.addEventListener('click', (e) => {
	console.log(e.target.parentElement.parentElement)
})

appliance_btn.addEventListener('click', (e) => {
	console.log(e.target.parentElement.parentElement)
})

ustensils_btn.addEventListener('click', (e) => {
	console.log(e.target.parentElement.parentElement)
})
*/
