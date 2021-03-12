'use strict';
;
(function() {
	let dataCard = [
		{
			name: 'Sunset',
			text: 'Интернет-магазин с личным кабинетом',
			price: 10000,
			grid: 'adaptive',
			img: 'img/model1.jpg',
			features: ['slider', 'block', 'news', 'gallery', 'trach']
		},
		{
			name: 'Panteon',
			text: 'Lorem ipsum dolor.',
			price: 1000,
			grid: 'adaptive',
			img: 'img/model2.jpg',
			features: ['slider', 'news', 'gallery', 'trach']
		},
		{
			name: 'Artactive',
			text: 'Ipsum dolor sit amet, consectetur.',
			price: 5000,
			grid: 'adaptive',
			img: 'img/model3.jpg',
			features: ['slider', 'news', 'trach']
		},
		{
			name: 'Adele',
			text: 'Sit amet, consectetur adipisicing elit.',
			price: 7000,
			grid: 'adaptive',
			img: 'img/model4.jpg',
			features: ['slider', 'news']
		},
		{
			name: 'Zeus',
			text: 'Lorem ipsum dolor sit amet.',
			price: 2000,
			grid: 'adaptive',
			img: 'img/model5.jpg',
			features: ['slider', 'block', 'news', 'gallery']
		},
		{
			name: 'Sparta',
			text: 'Dolor sit amet, consectetur adipisicing.',
			price: 500,
			grid: 'adaptive',
			img: 'img/model6.jpg',
			features: ['slider', 'news', 'gallery', 'trach']
		},
		{
			name: 'Aris',
			text: 'Резиновая сетка, consectetur adipisicing.',
			price: 5600,
			grid: 'rubber',
			img: 'img/model4.jpg',
			features: ['slider', 'news', 'gallery', 'trach']
		},
		{
			name: 'Nerds',
			text: 'Фиксированная сетка, consectetur adipisicing.',
			price: 1400,
			grid: 'fixed',
			img: 'img/model3.jpg',
			features: ['slider', 'news', 'gallery', 'trach']
		}
	];
	let template = document.querySelector('.card__template')
	.content
	.querySelector('li');

	let modelsUl = document.querySelector('.models ul');

	let modelsLi = modelsUl.querySelectorAll('li');
	for (let i = 0; i < modelsLi.length; i++) {
		modelsLi[i].remove();
	}

	let renderCard = function(dataItem) {
		let card = template.cloneNode(true);
		let header = card.querySelector('h2');
		let text = card.querySelector('p');
		let price = card.querySelector('a');
		let img = card.querySelector('.card');
		header.textContent = dataItem.name;
		text.textContent = dataItem.text;
		price.textContent = dataItem.price + ' р.';
		img.setAttribute('style', 'background-image: url(' + dataItem.img +')');
		return card;
	}

	for (let i = 0; i < dataCard.length; i++) {
		modelsUl.appendChild(renderCard(dataCard[i]));
	}
	window.data = {
		data: dataCard,
		ul: modelsUl,
		renderCard: renderCard
	}
})();