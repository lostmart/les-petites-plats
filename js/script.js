import recipeFactory from './factories/RecipeFactory.js'
import { createCard } from './factories/Utils.js'
import setItems from './factories/DataArrays.js'
import { recipes } from '../../data/recipes.js'
import { mainSeacrh } from './factories/Filters.js'

// GLOBAL variables
let receipiesArray = [] // data for all the receipies
let ingredientsArray = [] // data for all the ingredients
let utencilesArray = [] // data for all the utelciles
let appliancesArray = [] // data for all the appliances
let filteredRecipes = [] // data for all filtered recipes  ???????

const cards_container = document.querySelector('[data-cards-container]')
const rechGeneral = document.querySelector('#Rechercher')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')

const init = () => {
	recipes.forEach((rec) => {
		const newRecipieFromModel = recipeFactory(rec)
		populateDom(rec)
		receipiesArray.push(newRecipieFromModel)
	})
	ingredientsArray = setItems().ingredientsArray
	utencilesArray = setItems().utencilesArray
	appliancesArray = setItems().appliancesArray
	// console.log(ingredientsArray)
}

rechGeneral.addEventListener('input', (e) => {
	const value = textFormatter(e.target.value.trim())
	if (value.length > 2) {
		const result = mainSeacrh(receipiesArray, value)
		cards_container.textContent = ''
		result.forEach((recipie) => {
			cards_container.append(createCard(recipie))
		})

	}
})

function populateDom(recipie) {
	cards_container.append(createCard(recipie))
}

init()

// returns the unicode form of the string -> NFC "Canonical Decomposition"
function textFormatter(string) {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
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
