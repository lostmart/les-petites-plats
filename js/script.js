import domCard from './factories/CardFn.js'
import {
	ingredientsArray,
	ingredientsArrayFilter,
	ustensilsArray,
	appliance,
	domLists,
} from './factories/CardFn.js'

import { recipes } from '../data/recipes.js'

let cards = []
let largeBtn = null
// filteredCards
let filteredCards = []

const cards_container = document.querySelector('[data-cards-container]')
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')
const rechGeneral = document.querySelector('#Rechercher')

cards = recipes.map((card) => {
	const cardReady = domCard(card)
	cards_container.append(cardReady)
	return {
		name: card.name,
		ingredients: card.ingredients,
		element: cardReady,
	}
})

// listens to input and filters
rechGeneral.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase()
	if (value.length >= 3) {
		filterDom(value)
	}
	if (value === '') {
		filterDom(value)
	}
})

// listens to "delete button" (backspace)
rechGeneral.addEventListener('keydown', (e) => {
	const value = e.target.value.toLowerCase()
	if (e.key == 'Backspace') {
		filterDom(value)
	}
})

document.querySelector('body').addEventListener('click', (e) => {
	closeBigBtn()
})

// ingredients click
ingredients_btn.addEventListener('click', (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
	largeBtn.append(domLists(ingredientsArray))
})

appliance_btn.addEventListener('click', (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
})

ustensils_btn.addEventListener('click', (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
})

function closeBigBtn() {
	if (largeBtn) {
		largeBtn.style.width = '170px'
		largeBtn.style.maxHeight = '69px'
		largeBtn.style.overflow = 'inherit'
		largeBtn = null
	}
}

function openBigBtn() {
	largeBtn.style.width = '667px'
	largeBtn.style.maxHeight = '397px'
	largeBtn.style.overflow = 'auto'
}

// filters the cards based on he big research
export function filterDom(value) {
	cards.forEach((card) => {
		const { name } = card
		const isVisible = name.toLowerCase().includes(value)
		card.element.classList.toggle('d-none', !isVisible)
	})
}

// HEREEEE
// filter by ingredient
export function filterDomByTags(value, nameElem) {
	// cards:  array with all recepies (objects{name: string / ingredients: [Objects] / element: Node})
	// ingredientsArrayFilter : array with all filters
	// filteredCards: array with cards that contain certain words
	cards_container.textContent = ''

	// filter by ingredient tag
	if (nameElem === 'card-ingredients') {
		// check if there is a filter tag already
		if (filteredCards.length === 0) {
			// clear the dom container
			// search though ALL cards with no filters
			searchByTagName(value, cards)
			console.log(filteredCards)
			filteredCards.forEach((filteredCrd) => {
				cards_container.append(filteredCrd.element)
			})
		} else {
			//searchByTagName(value, filteredCards)
			let tempArr = []
			filteredCards.forEach((filteredCrd) => {
				const { ingredients } = filteredCrd
				ingredients.forEach((ing) => {
					if (ing.ingredient === value) {
						tempArr.push(filteredCrd)
					}
				})
				filteredCards = tempArr
			})
			filteredCards.forEach((filteredCrd) => {
				cards_container.append(filteredCrd.element)
			})
			console.log(filteredCards)
		}
	}
}

function searchByTagName(value, arrayElement) {
	arrayElement.forEach((card) => {
		const { ingredients } = card
		// for each ingredient of each card obj
		ingredients.forEach((ing) => {
			if (ing.ingredient === value) {
				filteredCards.push(card)
			}
		})
	})
}
