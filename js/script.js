import recipeFactory from './factories/RecipeFactory.js'
import {
	createCard,
	domLists,
	makeCapital,
	textFormatter,
	tagToDom,
} from './factories/Utils.js'
import setItems from './factories/DataArrays.js'
import { recipes } from '/data/recipes.js'
import { mainSeacrh, filterByTags, inputsfilter } from './factories/Filters.js'

// GLOBAL variables
const receipiesArray = [] // data for all the receipies ( not supposed to change)
let ingredientsArray = [] // data for all the ingredients
let appliancesArray = [] // data for all the appliances
let utencilesArray = [] // data for all the utelciles
let filteredRecipes = [] // data for all filtered recipes ( necessary for complex researches, with one than more param )
let openChart = null
let filterTags = [] // array of tags for filtering recipies
// let inpuFilteredTags = [] // array of tags filtered using the inputs (ingredients / appareils / ustensiles)

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
const inputsNodes = document.querySelectorAll('input[type=text]')
const ul = document.querySelector('.dropdown-menu')

const init = () => {
	ingredientsArray = setItems().ingredientsArray
	utencilesArray = setItems().utencilesArray
	appliancesArray = setItems().appliancesArray

	// only time DOM population without filters
	recipes.forEach((rec) => {
		const newRecipieFromModel = recipeFactory(rec)
		populateDom(rec)
		receipiesArray.push(newRecipieFromModel)
		filteredRecipes = receipiesArray
	})
	// console.log(filteredRecipes)
	// console.log(setItems())
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
})

body.addEventListener('click', function (e) {
	if (openChart === 'ingredients') {
		document.querySelectorAll('.form-control')[1].classList.toggle('d-none')
		ingredients_btn.classList.toggle('d-none')
		openChart = null
		inputsNodes[0].value = ''
	}
	if (openChart === 'appliance') {
		document.querySelectorAll('.form-control')[2].classList.toggle('d-none')
		appliance_btn.classList.toggle('d-none')
		ul.style.left = '0'
		openChart = null
		inputsNodes[1].value = ''
	}

	if (openChart === 'ustensils') {
		document.querySelectorAll('.form-control')[3].classList.toggle('d-none')
		ustensils_btn.classList.toggle('d-none')
		ul.style.left = '0'
		openChart = null
		inputsNodes[2].value = ''
	}

	ul.classList.add('d-none')
	ul.textContent = ''
})

// BIG GERNERAL SEARCH
rechGeneral.addEventListener('input', (e) => {
	const value = textFormatter(e.target.value.trim())
	// if (value.length === 0) {
	// 	console.log('dont erase me !!!')
	// 	error_msg.classList.add('no-result')
	// 	receipiesArray.forEach((rec) => populateDom(rec))
	// }
	if (value.length > 2) {
		const result = mainSeacrh(receipiesArray, value)
		cards_container.textContent = ''
		if (result.length > 1) {
			filteredRecipes = result
			filteredRecipes.forEach((recipie) => {
				cards_container.append(createCard(recipie))
			})
		} else {
			error_msg.classList.remove('no-result')
		}
	}
})

// general search (backspace) => check value length and reset under value.length < 3
rechGeneral.addEventListener('keyup', (e) => {
	const value = textFormatter(e.target.value.trim())
	if (e.key == 'Backspace') {
		error_msg.classList.add('no-result')
		filteredRecipes = mainSeacrh(receipiesArray, value)
		//console.log(value.length)
		if (value.length < 3) {
			resetFilter()
		}
	}
})

// clear search input 'search' listener ( x )
rechGeneral.addEventListener('search', (e) => {
	resetFilter()
})

/*  TAGS SEARCH    */

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

// ingredients / apareils / ustensiles input search
inputsNodes.forEach((input) =>
	input.addEventListener('input', function (e) {
		const value = textFormatter(e.currentTarget.value)
		const arrayFilter = e.currentTarget.getAttribute('aria-label')
		if (value != '' && arrayFilter === 'Ingredients search input') {
			ul.textContent = ''
			// ingredients filter & populates DOM after
			inputsfilter(ingredientsArray, value).forEach((elem, indx) => {
				const itemCapicat = makeCapital(elem)
				// title / index / arrayName
				ul.append(domLists(itemCapicat, indx, 'ingredients_array'))
			})
		} else if (value != '' && arrayFilter === 'Appareils search input') {
			ul.textContent = ''
			// applicance filter
			inputsfilter(appliancesArray, value).forEach((elem, indx) => {
				const itemCapicat = makeCapital(elem)
				// title / index / arrayName
				ul.append(domLists(itemCapicat, indx, 'appliance_array'))
			})
		} else if (value != '' && arrayFilter === 'Ustensiles search input') {
			ul.textContent = ''
			// ustensiles filter
			inputsfilter(utencilesArray, value).forEach((elem, indx) => {
				const itemCapicat = makeCapital(elem)
				// title / index / arrayName
				ul.append(domLists(itemCapicat, indx, 'ustensils_array'))
			})
		}
		// empty
		else {
			// repopulate the ul thing based on which input was clicked ( ingredients / apareils / ustensiles)
			if (arrayFilter === 'Ingredients search input') {
				ingredientsArray.forEach((elem, indx) => {
					const titleCapital = makeCapital(elem)
					// title / index / arrayName
					ul.append(domLists(titleCapital, indx, 'ingredients_array'))
				})
			}
			if (arrayFilter === 'Appareils search input') {
				appliancesArray.forEach((elem, indx) => {
					const titleCapital = makeCapital(elem)
					// title / index / arrayName
					ul.append(domLists(titleCapital, indx, 'appliance_array'))
				})
			}
			if (arrayFilter === 'Ustensiles search input') {
				utencilesArray.forEach((elem, indx) => {
					const titleCapital = makeCapital(elem)
					// title / index / arrayName
					ul.append(domLists(titleCapital, indx, 'ustensils_array'))
				})
			}
		}
	})
)

/*  GENERAL FUNCTIONS   */

// populates filterTags array with new tags selected
// arrayName  ( ingredients, appareils or ustensils )
export function createTags(indx, arrayName, elementName) {
	cards_container.textContent = ''
	filters_container.textContent = ''
	let selectedItem = null
	// check which array we need to add
	if (arrayName === 'ingredients_array') {
		// ingredients
		const dynamiIndx = ingredientsArray.indexOf(elementName)
		// console.log(dynamiIndx)
		selectedItem = ingredientsArray[dynamiIndx]
	}
	if (arrayName === 'appliance_array') {
		const dynamiIndx = appliancesArray.indexOf(elementName)

		// appliances
		selectedItem = appliancesArray[dynamiIndx]
	}
	//ustensils
	if (arrayName === 'ustensils_array') {
		const dynamiIndx = utencilesArray.indexOf(elementName)
		// appliances
		selectedItem = utencilesArray[dynamiIndx]
	}
	// checks if it's already in the array
	if (!filterTags.includes(selectedItem)) {
		filterTags.push(selectedItem)
	}

	// adds each value from the array to the DOM
	filterTags.forEach((ingrTag) => {
		filters_container.append(tagToDom(makeCapital(ingrTag), arrayName))
		filteredRecipes = filterByTags(filteredRecipes, ingrTag)
		filteredRecipes.forEach((recipie) => populateDom(recipie))
	})
}

export function removeTag(elemName, arrayName) {
	elemName = elemName.toLowerCase()
	let filteredTagsNoSelectedElem = filterTags.filter((elem) => elem != elemName)
	filterTags = filteredTagsNoSelectedElem
	filters_container.textContent = ''
	// adds each value fropm the array to the DOM
	filterTags.forEach((ingrTag) => {
		filters_container.append(tagToDom(makeCapital(ingrTag), arrayName))
	})
	// filteredRecipes.filter(recipie=>  )
	const result = filteredRecipes.filter((rec) => {
		rec.appliance != elemName
	})
	filteredRecipes = result
	cards_container.textContent = ''
	// console.log(filteredRecipes)
	if (filteredRecipes.length > 0) {
		filteredRecipes.forEach((rec) => {
			populateDom(rec)
		})
	} else {
		receipiesArray.forEach((rec) => {
			populateDom(rec)
		})
	}
}

// appends a recipie model to the DOM based on a factory fn (utils.js)
function populateDom(recipe) {
	cards_container.append(createCard(recipe))
}

function toggleShow(elem) {
	elem.classList.toggle('d-none')
	elem.style.backgroundColor = '#3282f7'
}

// clears all the research
function resetFilter() {
	console.log('reset app ... ')
	cards_container.textContent = ''
	filteredRecipes = receipiesArray
	receipiesArray.forEach((recipe) => populateDom(recipe))
}

init()
