class CardModel {
	constructor({
		appliance,
		description,
		id,
		ingredients,
		name,
		servings,
		time,
		ustensils,
	}) {
		this.appliance = appliance ?? null
		this.description = description ?? null
		this.id = id ?? null
		this.ingredients = ingredients ?? null
		this.name = name ?? null
		this.servings = servings ?? null
		this.time = time ?? null
		this.ustensils = ustensils ?? null
	}

	createArticle() {
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

		h5.textContent = this.name
		card_img.src = '../../assets/bg-img.jpg'
		card_img.alt = this.name

		time_img.src = '../../assets/watch.svg'
		time_img.alt = 'time / clock'

		span.textContent = this.time + ' min'

		time_container.appendChild(time_img)
		time_container.appendChild(span)

		this.ingredients.forEach((ingr) => {
			const li = document.createElement('li')
			li.classList.add('list-group-item')
			li.innerHTML = `<strong>${ingr.ingredient}:</strong> ${ingr.quantity} `
			ingr.unit ? (li.innerHTML += ingr.unit) : false
			ul.appendChild(li)
			// console.log(ingr)
		})

		p.textContent = this.description.slice(0, 174) + '...'

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
}

export default CardModel
