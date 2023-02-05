import recipeFactory from './factories/RecipeFactory.js'
import {
	createCard,
	domLists,
	makeCapital,
	textFormatter,
	tagToDom,
} from './factories/Utils.js'
import setItems from './factories/DataArrays.js'
import { recipes } from '../../data/recipes.js'
import { mainSeacrh } from './factories/Filters.js'

// GLOBAL variables
let receipiesArray = [] // data for all the receipies
let ingredientsArray = [] // data for all the ingredients
let utencilesArray = [] // data for all the utelciles
let appliancesArray = [] // data for all the appliances
let filteredRecipes = [] // data for all filtered recipes  ???????

let filterTags = [] // array of tags for filtering recipies

// DOM ELEMENTS
const form = document.querySelector('form')
const cards_container = document.querySelector('[data-cards-container]')
const rechGeneral = document.querySelector('#Rechercher')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')
const error_msg = document.querySelector('[data-error-msg]')
const filters_container = document.querySelector('[data-filters]')

const init = () => {
	ingredientsArray = setItems().ingredientsArray
	utencilesArray = setItems().utencilesArray
	appliancesArray = setItems().appliancesArray
	recipes.forEach((rec) => {
		const newRecipieFromModel = recipeFactory(rec)
		populateDom(rec)
		receipiesArray.push(newRecipieFromModel)
	})
	// console.log(setItems())
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
})

rechGeneral.addEventListener('input', (e) => {
	const value = textFormatter(e.target.value.trim())
	if (value.length === 0) {
		error_msg.classList.add('no-result')
		receipiesArray.forEach((rec) => populateDom(rec))
	}
	if (value.length > 2) {
		const result = mainSeacrh(receipiesArray, value)
		cards_container.textContent = ''
		if (result.length > 1) {
			result.forEach((recipie) => {
				cards_container.append(createCard(recipie))
			})
		} else {
			error_msg.classList.remove('no-result')
		}
	}
})

rechGeneral.addEventListener('keydown', (e) => {
	const value = textFormatter(e.target.value.trim())
	if (e.key == 'Backspace') {
		error_msg.classList.add('no-result')
		const result = mainSeacrh(receipiesArray, value)
		cards_container.textContent = ''
		result.forEach((recipie) => {
			cards_container.append(createCard(recipie))
		})
	}
})

rechGeneral.addEventListener('click', (e) => {
	const value = textFormatter(e.target.value.trim())
	if (value === '') {
		error_msg.classList.add('no-result')
		receipiesArray.forEach((rec) => populateDom(rec))
	}
})

ingredients_btn.addEventListener('click', function (e) {
	this.classList.add('d-none')
	document.querySelectorAll('.form-control')[1].classList.remove('d-none')
	document.querySelectorAll('.form-control')[1].focus()
	const ul = document.querySelector('.dropdown-menu')
	ul.classList.remove('d-none')
	ul.style.backgroundColor = '#3282f7'
	ingredientsArray.forEach((elem, indx) => {
		const titleCapital = makeCapital(elem)
		ul.append(domLists(titleCapital, indx))
	})
})

// populates filterTags array with new tags selected
export function createTags(indx) {
	const selectedItem = ingredientsArray[indx]
	// checks if it's already in the array
	if (!filterTags.includes(selectedItem)) {
		filterTags.push(selectedItem)
	}
	filters_container.textContent = ''
	// adds each value fropm the array to the DOM
	filterTags.forEach((ingrTag) =>
		filters_container.append(tagToDom(makeCapital(ingrTag)))
	)
}

function populateDom(recipie) {
	cards_container.append(createCard(recipie))
}

init()
