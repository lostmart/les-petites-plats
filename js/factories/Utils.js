export const createCard = (data) => {
	const { name, time, description, ingredients } = data

	const article = document.createElement('article')
	const card_body = document.createElement('div')
	const card_container = document.createElement('div')
	const time_container = document.createElement('div')
	const span = document.createElement('span')
	const h5 = document.createElement('h5')
	const card_img = document.createElement('img')
	const time_img = document.createElement('img')
	const row = document.createElement('div')
	const col_left = document.createElement('div')
	const col_right = document.createElement('div')
	const ul = document.createElement('ul')
	const p = document.createElement('p')

	article.classList.add('card')
	card_body.classList.add('card-body')
	card_container.classList.add('d-flex')
	card_container.classList.add('justify-content-between')
	card_container.classList.add('mb-2')
	row.classList.add('row')
	col_left.classList.add('col')
	col_right.classList.add('col')
	p.classList.add('card-text')

	h5.textContent = name
	card_img.src = '../../assets/bg-img.jpg'
	card_img.alt = name

	time_img.src = '../../assets/watch.svg'
	time_img.alt = 'time / clock'

	span.textContent = time + ' min'

	time_container.appendChild(time_img)
	time_container.appendChild(span)

	ingredients.forEach((ingr) => {
		const li = document.createElement('li')
		li.classList.add('list-group-item')
		li.innerHTML = `<strong>${ingr.ingredient}:</strong> ${ingr.quantity} `
		ingr.unit ? (li.innerHTML += ingr.unit) : false
		ul.appendChild(li)
	})

	p.textContent = description.slice(0, 174) + '...'

	col_left.appendChild(ul)
	row.appendChild(col_left)

	col_right.appendChild(p)
	row.appendChild(col_right)

	card_container.appendChild(h5)
	card_container.appendChild(time_container)
	card_body.appendChild(card_container)
	card_body.appendChild(row)

	article.appendChild(card_img)
	article.appendChild(card_body)

	return article
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

// will return a ul element filled with items with a class "list-group-item"
export function domLists(elementsArray) {
	const ul = document.createElement('ul')
	ul.classList.add('list-group')
	ul.classList.add('list-group-horizontal')
	ul.classList.add('flex-wrap')
	ul.classList.add('justify-content-around')

	elementsArray.forEach((element) => {
		const li = document.createElement('li')
		li.classList.add('list-group-item')
		li.addEventListener('click', (e) => {
			e.stopPropagation()
			handleListClick(e.target.textContent)
			filterDomByTags(e.target.textContent, 'card-ingredients')
		})
		li.textContent = element
		ul.append(li)
	})
	return ul
}

export default createCard

// returns the unicode form of the string -> NFC "Canonical Decomposition"
export function textFormatter(string) {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}
