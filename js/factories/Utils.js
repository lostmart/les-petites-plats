import { createTags, removeTag } from '../script.js'

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

// will return an li element with a class "list-group-item"
// it sets data-indx attribute to easly track clicks
// last arg: arrayName ( ingredients, appareils or ustensils )
export function domLists(element, indx, arrayName) {
	const li = document.createElement('li')
	const link = document.createElement('a')
	link.href = '#'
	link.classList.add('dropdown-item')
	link.role = 'button'
	link.ariaPressed = 'false'
	link.textContent = element
	li.append(link)
	li.setAttribute('data-indx', indx)
	li.setAttribute('data-array', '')
	li.classList.add('list-group-item')

	li.addEventListener('click', function (e) {
		// passes the index of the element clicked
		e.stopPropagation()
		const elementName = this.textContent.toLocaleLowerCase()
		// pass arrayName to know which tag to add
		createTags(this.getAttribute('data-indx'), arrayName, elementName)
	})

	return li
}

// tags in DOM return a dom element with its tag
export function tagToDom(elemName, arrayName) {
	const classList = [
		'btn',
		'badge',
		'bg-primary',
		'my-3',
		'me-3',
		'px-3',
		'd-flex',
		'align-items-center',
		'gap-3',
	]
	const button = document.createElement('button')
	const span = document.createElement('span')
	const img = document.createElement('img')

	img.alt = 'close button'
	img.src = './assets/close-cross.svg'

	span.textContent = elemName

	// add a bucn of classes to the btn element
	for (let i = 0; i < classList.length; i++) {
		const newClass = classList[i]
		button.classList.add(newClass)
	}

	button.append(span)
	button.append(img)

	button.addEventListener('click', function (e) {
		removeTag(this.textContent, arrayName)
		e.stopPropagation()
	})

	return button
}

// returns the unicode form of the string -> NFC "Canonical Decomposition"
export function textFormatter(string) {
	return string
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
}

export function makeCapital(word) {
	return word.charAt(0).toUpperCase() + word.substr(1)
}
