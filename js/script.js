import domCard from './factories/CardFn.js'
// import { ingredientsArray } from './factories/CardFn.js'

import { recipes } from '../data/recipes.js'

let cards = []

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

rechGeneral.addEventListener('input', (e) => {
	const value = e.target.value.toLowerCase()
	if (value.length >= 3) {
		populateDom(value)
	}
})

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

function populateDom(value) {
	cards.forEach((card) => {
		const isVisible = card.name.toLowerCase().includes(value)
		card.element.classList.toggle('d-none', !isVisible)
	})
}

// console.log(card)
// cards_container.append(card.createArticle())
