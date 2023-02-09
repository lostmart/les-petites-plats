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
let appliancesArray = [] // data for all the appliances
let utencilesArray = [] // data for all the utelciles
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
		console.log('body click')
		document.querySelectorAll('.form-control')[1].classList.toggle('d-none')
		ingredients_btn.classList.toggle('d-none')
		openChart = null
	}
	if (openChart === 'appliance') {
		document.querySelectorAll('.form-control')[2].classList.toggle('d-none')
		console.log('body click')
		appliance_btn.classList.toggle('d-none')
		ul.style.left = '0'
		openChart = null
	}

	if (openChart === 'ustensils') {
		document.querySelectorAll('.form-control')[3].classList.toggle('d-none')
		ustensils_btn.classList.toggle('d-none')
		ul.style.left = '0'
		openChart = null
	}

	ul.classList.add('d-none')
	ul.textContent = ''
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
			// title / index / arrayName
			ul.append(domLists(titleCapital, indx, 'ingredients_array'))
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
		ul.style.borderColor = 'transparent'
		ul.style.left = '204px'
		openChart = 'appliance'

		appliancesArray.forEach((elem, indx) => {
			const titleCapital = makeCapital(elem)
			// title / index / arrayName
			ul.append(domLists(titleCapital, indx, 'appliance_array'))
		})
	}
})

/* ustensils  click  */
ustensils_btn.addEventListener('click', function (e) {
	e.stopPropagation()
	if (!openChart) {
		this.classList.toggle('d-none')

		document.querySelectorAll('.form-control')[3].classList.remove('d-none')
		document.querySelectorAll('.form-control')[3].focus()
		openChart = 'ustensils'

		toggleShow(ul)
		ul.style.backgroundColor = '#ed6454'
		ul.style.borderColor = 'transparent'
		ul.style.left = '401px'
		openChart = 'ustensils'

		utencilesArray.forEach((elem, indx) => {
			const titleCapital = makeCapital(elem)
			// title / index / arrayName
			ul.append(domLists(titleCapital, indx, 'ustensils_array'))
		})
	}
})

// populates filterTags array with new tags selected
// arrayName  ( ingredients, appareils or ustensils )
export function createTags(indx, arrayName) {
	let selectedItem = null
	console.log(arrayName)
	// check which array we need to add
	if (arrayName === 'ingredients_array') {
		// ingredients
		selectedItem = ingredientsArray[indx]
	}
	if (arrayName === 'appliance_array') {
		// appliances
		selectedItem = appliancesArray[indx]
	}
	//ustensils
	if (arrayName === 'ustensils_array') {
		// appliances
		selectedItem = utencilesArray[indx]
	}
	// checks if it's already in the array
	if (!filterTags.includes(selectedItem)) {
		filterTags.push(selectedItem)
	}
	filters_container.textContent = ''
	// adds each value fropm the array to the DOM
	filterTags.forEach((ingrTag) =>
		filters_container.append(tagToDom(makeCapital(ingrTag), arrayName))
	)
}

export function removeTag(elemName, arrayName) {
	elemName = elemName.toLowerCase()
	let filteredTagsNoSelectedElem = filterTags.filter((elem) => elem != elemName)
	filterTags = filteredTagsNoSelectedElem
	filters_container.textContent = ''
	// adds each value fropm the array to the DOM
	filterTags.forEach((ingrTag) =>
		filters_container.append(tagToDom(makeCapital(ingrTag), arrayName))
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
