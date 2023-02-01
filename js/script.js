import recipeMockData from './factories/RecipeFactory.js'
import { createCard } from './factories/Utils.js'

// three global variables
let receipiesArray = [] // data for all the receipies


const cards_container = document.querySelector('[data-cards-container]')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')
const rechGeneral = document.querySelector('#Rechercher')

// array of all the receipies
receipiesArray = new recipeMockData([
	'id',
	'name',
	'ingredients',
	'description',
	'ustensils',
	'appliance',
])

let { recipes } = receipiesArray

populateDom()

rechGeneral.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase()
	if (value.length >= 3) {
		const result = receipiesArray.filterByParameters({
			type: 'name',
			name: value,
		})
		console.log(result)
	}
})

function populateDom() {
	console.log(receipiesArray)
	recipes.forEach((recipie) => cards_container.append(createCard(recipie)))
}

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
