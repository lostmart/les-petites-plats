import domCard from "./factories/CardFn.js"
import {
	ingredientsArray,
	ustensilsArray,
	appliance,
	domLists,
} from "./factories/CardFn.js"

import { recipes } from "../data/recipes.js"

let cards = []
let largeBtn = null

const cards_container = document.querySelector("[data-cards-container]")
const ingredients_btn = document.querySelector('[data-btn="ingredients"]')
const appliance_btn = document.querySelector('[data-btn="appliance"]')
const ustensils_btn = document.querySelector('[data-btn="ustensils"]')
const rechGeneral = document.querySelector("#Rechercher")

cards = recipes.map((card) => {
	const cardReady = domCard(card)
	cards_container.append(cardReady)
	return {
		name: card.name,
		ingredients: card.ingredients,
		element: cardReady,
	}
})

rechGeneral.addEventListener("input", (e) => {
	const value = e.target.value.toLowerCase()
	if (value.length >= 3) {
		filterDom(value)
	}
})

document.querySelector("body").addEventListener("click", (e) => {
	closeBigBtn()
})

rechGeneral.addEventListener("keydown", (e) => {
	const value = e.target.value.toLowerCase()
	if (e.key == "Backspace") {
		filterDom(value)
	}
})

// ingredients click
ingredients_btn.addEventListener("click", (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
	largeBtn.append(domLists(ingredientsArray))
})

appliance_btn.addEventListener("click", (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
})

ustensils_btn.addEventListener("click", (e) => {
	closeBigBtn()
	e.stopPropagation()
	largeBtn = e.target.parentElement.parentElement.parentElement
	openBigBtn()
})

function closeBigBtn() {
	if (largeBtn) {
		largeBtn.style.width = "170px"
		largeBtn.style.maxHeight = "69px"
		largeBtn.style.overflow = "inherit"
		largeBtn = null
	}
}

function openBigBtn() {
	largeBtn.style.width = "667px"
	largeBtn.style.maxHeight = "397px"
	largeBtn.style.overflow = "auto"
}

// filters the cards based on he big research
function filterDom(value) {
	cards.forEach((card) => {
		const isVisible = card.name.toLowerCase().includes(value)
		card.element.classList.toggle("d-none", !isVisible)
	})
}
