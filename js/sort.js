'use strict';
;
(function() {
	let data = window.filter.data.slice(0, 6);
	// console.log(data);
	let priceBtn = document.querySelector('.slider__price');
	let typeBtn = document.querySelector('.slider__type');
	let optionsBtn = document.querySelector('.slider__options');
	let upFlag = true;
	let sortType = 'unsorted';
	let arrowDown = document.querySelector('.arrow-down');
	let arrowUp = document.querySelector('.arrow-up');
	let priceSortedMin;
	let priceSortedMax;
	let typeSortedMin;
	let typeSortedMax;
	let optionsSortedMin;
	let optionsSortedMax;

	// console.log(data);
	let sortData = function() {
		priceSortedMin = data.slice().sort(function (first, second) {
			return first.price - second.price;
		});
		priceSortedMax = data.slice().sort(function (first, second) {
			return second.price - first.price;
		});
	// console.log(priceSortedMin);
		typeSortedMin = data.slice().sort(function (first, second) {
			if (first.text > second.text) {
				return 1;
			} else if (first.text < second.text) {
				return -1;
			} else {
				return 0;
			}
		});
		typeSortedMax = data.slice().sort(function (first, second) {
			if (first.text < second.text) {
				return 1;
			} else if (first.text > second.text) {
				return -1;
			} else {
				return 0;
			}
		});
		// console.log(typeSortedMax);
		optionsSortedMin = data.slice().sort(function (first, second) {
			if (first.features.length > second.features.length) {
				return 1;
			} else if (first.features.length < second.features.length) {
				return -1;
			} else {
				return 0;
			}
		});
		optionsSortedMax = data.slice().sort(function (first, second) {
			if (first.features.length < second.features.length) {
				return 1;
			} else if (first.features.length > second.features.length) {
				return -1;
			} else {
				return 0;
			}
		});
	}
	sortData();
	// console.log(optionsSortedMax);

	let renderSort = function(evt, sorted, type) {
		evt.preventDefault();
		// data = window.filter.data.slice(0, 6);
		let modelsLi = window.data.ul.querySelectorAll('li');
		for (let i = 0; i < modelsLi.length; i++) {
			modelsLi[i].remove();
		}
		// console.log('render');
		for (let i = 0; i < sorted.length; i++) {
			window.data.ul.appendChild(window.data.renderCard(sorted[i]));			
		}
		sortType = type;
	}
	let renderClear = function(evt) {
		evt.preventDefault();
		// data = window.filter.data.slice(0, 6);
		let modelsLi = window.data.ul.querySelectorAll('li');
		for (let i = 0; i < modelsLi.length; i++) {
			modelsLi[i].remove();
		}		
		// console.log('clear');
		for (let i = 0; i < data.length; i++) {
			window.data.ul.appendChild(window.data.renderCard(data[i]));	
		}
		sortType = 'unsorted';
	}

	
	priceBtn.addEventListener('click', function() {
		data = window.filter.data.slice(0, 6);
		sortData();
		priceBtn.classList.toggle('slider-active');
		typeBtn.classList.remove('slider-active');
		optionsBtn.classList.remove('slider-active');
		if (sortType !== 'price') {
			if (upFlag) {
				renderSort(event, priceSortedMin, 'price');		 	
			} else {
				renderSort(event, priceSortedMax, 'price');	
			}
		} else {
			renderClear(event);
		}
	});
	typeBtn.addEventListener('click', function() {
		data = window.filter.data.slice(0, 6);
		sortData();
		typeBtn.classList.toggle('slider-active');
		priceBtn.classList.remove('slider-active');
		optionsBtn.classList.remove('slider-active');
		if (sortType !== 'type') {
			if (upFlag) {
				renderSort(event, typeSortedMin, 'type');		 	
			} else {
				renderSort(event, typeSortedMax, 'type');			
			}
		} else {
			renderClear(event);
		}
	});
	optionsBtn.addEventListener('click', function() {
		data = window.filter.data.slice(0, 6);
		sortData();
		optionsBtn.classList.toggle('slider-active');
		priceBtn.classList.remove('slider-active');
		typeBtn.classList.remove('slider-active');
		if (sortType !== 'options') {
			if (upFlag) {
				renderSort(event, optionsSortedMin, 'options');		 	
			} else {
				renderSort(event, optionsSortedMax, 'options');			
			}
		} else {
			renderClear(event);
		}
	});

	arrowUp.classList.toggle('arrow-up');
	arrowUp.classList.toggle('arrow-up-active');

	let onArrowDownClick = function(evt) {
		evt.preventDefault();
		data = window.filter.data.slice(0, 6);
		sortData();
		arrowDown.classList.remove('arrow-down');
		arrowDown.classList.add('arrow-down-active');
		arrowUp.classList.add('arrow-up');
		arrowUp.classList.remove('arrow-up-active');
		upFlag = false;
		if (sortType === 'price') {
			renderSort(event, priceSortedMax, 'price');
		} else if (sortType === 'type') {
			renderSort(event, typeSortedMax, 'type');
		} else if (sortType === 'options') {
			renderSort(event, optionsSortedMax, 'options');
		}
	}
	let onArrowUpClick = function(evt) {
		evt.preventDefault();
		data = window.filter.data.slice(0, 6);
		sortData();
		arrowDown.classList.add('arrow-down');
		arrowDown.classList.remove('arrow-down-active');
		arrowUp.classList.remove('arrow-up');
		arrowUp.classList.add('arrow-up-active');
		upFlag = true;
		if (sortType === 'price') {
			renderSort(event, priceSortedMin, 'price');
		} else if (sortType === 'type') {
			renderSort(event, typeSortedMin, 'type');
		} else if (sortType === 'options') {
			renderSort(event, optionsSortedMin, 'options');
		}
	}
	arrowDown.addEventListener('click', onArrowDownClick);
	arrowUp.addEventListener('click', onArrowUpClick);

	let render = function(evt) {
		// evt.preventDefault();
		data = window.filter.data.slice(0, 6);
		sortData();
		let dataSorted;
		if (sortType === 'price') {
			dataSorted = upFlag ? priceSortedMin : priceSortedMax;
		} else if (sortType === 'type') {
			dataSorted = upFlag ? typeSortedMin : typeSortedMax;
		} else if (sortType === 'options') {
			dataSorted = upFlag ? optionsSortedMin : optionsSortedMax;
		} else {
			dataSorted = data;
		}
		let modelsLi = window.data.ul.querySelectorAll('li');
		for (let i = 0; i < modelsLi.length; i++) {
			modelsLi[i].remove();
		}		
		// console.log('clear');
		for (let i = 0; i < data.length; i++) {
			window.data.ul.appendChild(window.data.renderCard(dataSorted[i]));	
		}		
	}
	let filter = document.querySelector('.filter');
	filter.addEventListener('click', render);
	document.addEventListener('keydown', function() {
		if (event.code == 'Enter' || 'NumpadEnter') {
			// console.log('Enter');
			render(event);
		}
	});
})();