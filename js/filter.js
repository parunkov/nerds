'use strict';
;
(function() {
	let data = window.data.data.slice();
	window.filter = {
		data: data
	}
	let filter = document.querySelector('.filter');
	let minPriceInput = document.querySelector('.min-price');
	let maxPriceInput = document.querySelector('.max-price');
	// let minPrice = minPriceInput.value;
	// let maxPrice = maxPriceInput.value;
	let filteredData = data.slice();
	// console.log(data);
	// console.log(minPriceInput);
	let grid = document.querySelectorAll('.radio');
	// console.log(grid);
	let features = document.querySelectorAll('.checkbox');
	// console.log(features);

	let onChangeFilter = function(evt) {
		let minPrice = minPriceInput.value;
		let maxPrice = maxPriceInput.value;
		filteredData = data.slice().filter(function(data) {
			// console.log(data.price);
			if (data.price < + minPrice) {
				return false;
			} else if (data.price > + maxPrice) {
				return false;
			} else {
				return true;
			}
		}).filter(function(data) {
			if (grid[0].checked) {
				return data.grid === 'adaptive';
			} else if (grid[1].checked) {
				return data.grid === 'fixed';
			} else if (grid[2].checked) {
				return data.grid === 'rubber';
			}
		}).filter(function(data) {
			if (features[0].checked) {
				for (let i = 0; i < data.features.length; i++) {
					// console.log(data.features);
					if (data.features[i] === 'slider') {
						// console.log(data.features[i]);
						return true;
					}
				}
			}
			else {
				return true;
			}
		}).filter(function(data) {
			if (features[1].checked) {
				for (let i = 0; i < data.features.length; i++) {
					if (data.features[i] === 'block') {
						return true;
					}
				}
			} else {
				return true;
			}
		}).filter(function(data) {
			if (features[2].checked) {
				for (let i = 0; i < data.features.length; i++) {
					if (data.features[i] === 'news') {
						return true;
					}
				}
			} else {
				return true;
			}
		}).filter(function(data) {
			if (features[3].checked) {
				for (let i = 0; i < data.features.length; i++) {
					if (data.features[i] === 'gallery') {
						return true;
					}
				}
			} else {
				return true;
			}
		}).filter(function(data) {
			if (features[4].checked) {
				for (let i = 0; i < data.features.length; i++) {
					if (data.features[i] === 'trach') {
						return true;
					}
				}
			} else {
				return true;
			}
		});
		window.filter.data = filteredData;
	}	
	filter.addEventListener('click', function() {
		// console.log(minPrice, data.price);
		onChangeFilter(event);
		// console.log(filteredData);
		// console.log(window.filter.data);
		// for (let i = 0; i < grid.length; i++) {
		// 	// console.log(i + ' ' + grid[i].checked);
		// }
	});	
	document.addEventListener('keydown', function() {
		// console.log(event.code);
		if (event.code == 'Enter' || 'NumpadEnter') {
			// console.log('Enter');
			onChangeFilter(event);
		}
	});
})();