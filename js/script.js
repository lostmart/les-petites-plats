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
let openChart = null

let filterTags = [] // array of tags for filtering recipies

// DOM ELEMENTS
const body = document.querySelector('body')
const form = document.querySelector('form')
const cards_container = document.querySelector('[data-cards-container]')
const rechGeneral = document.querySelector('#Rechercher')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appareils"]')
const ustensils_btn = document.querySelector('[data-btn="ustensiles"]')
const error_msg = document.querySelector('[data-error-msg]')
const filters_container = document.querySelector('[data-filters]')

const ul = document.querySelector('.dropdown-menu')

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

body.addEventListener('click', function (e) {
	if (openChart === 'ingredients') {
		const ul = document.querySelector('.dropdown-menu')
		document.querySelectorAll('.form-control')[1].classList.toggle('d-none')
		ul.classList.toggle('d-none')
		ul.textContent = ''
		ingredients_btn.classList.toggle('d-none')
		openChart = false
	}
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

/*  ingredients listeners   */
ingredients_btn.addEventListener('click', function (e) {
	e.stopPropagation()
	if (!openChart) {
		this.classList.toggle('d-none')

		document.querySelectorAll('.form-control')[1].classList.remove('d-none')
		document.querySelectorAll('.form-control')[1].focus()

		toggleShow(ul)
		openChart = 'ingredients'

		ingredientsArray.forEach((elem, indx) => {
			const titleCapital = makeCapital(elem)
			ul.append(domLists(titleCapital, indx))
		})
	}
})

/* appareils click  */
appliance_btn.addEventListener('click', function (e) {
	e.stopPropagation()
	if (!openChart) {
		this.classList.toggle('d-none')

		document.querySelectorAll('.form-control')[2].classList.remove('d-none')
		document.querySelectorAll('.form-control')[2].focus()

		toggleShow(ul)
		ul.style.backgroundColor = '#68d9a4'
		ul.style.borderColor = '#68d9a4'
		ul.style.left = '180px'
		openChart = 'appliance'

		appliancesArray.forEach((elem, indx) => {
			const titleCapital = makeCapital(elem)
			ul.append(domLists(titleCapital, indx))
		})
	}
	console.log(this)
})

/* ustensils  click  */
ustensils_btn.addEventListener('click', function (e) {
	e.stopPropagation()
	if (!openChart) {
		this.classList.toggle('d-none')
	}

	openChart = 'ustensils'

	console.log(this)
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

export function removeTag(elemName) {
	elemName = elemName.toLowerCase()
	let filteredTagsNoSelectedElem = filterTags.filter((elem) => elem != elemName)
	filterTags = filteredTagsNoSelectedElem
	filters_container.textContent = ''
	// adds each value fropm the array to the DOM
	filterTags.forEach((ingrTag) =>
		filters_container.append(tagToDom(makeCapital(ingrTag)))
	)
	console.log(filterTags)
}

function populateDom(recipie) {
	cards_container.append(createCard(recipie))
}

function toggleShow(elem) {
	elem.classList.toggle('d-none')
	elem.style.backgroundColor = '#3282f7'
}

init()
