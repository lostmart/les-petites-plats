export const createCard = (data) => {
	// Dom Elements
}

export const createFilter = (data) => {
	// Dom Elements
}

export const createListingCards = (data) => {
	let domElement = ''
	data.forEach((elem) => {
		domElement += createCard(elem)
	})
	return domElement
}
// const elements = createListingCards(recipesData)
//document.querySelector("#").append(domElement);

export const createListingFilters = (data) => {}
