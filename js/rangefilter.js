'use strict';
;
(function() {
	const MIN_PRICE = 0;
	const MAX_PRICE = 15000;
	const TOGGLE_WIDTH = 20;
	const INPUT_PRECISION = 100;
	const MIN_TOGGLE_POSITION = 30;
	const MAX_TOGGLE_POSITION = 190;
	let slider = document.querySelector('.range-controls');
	let rangeFilter = document.querySelector('.range-filter');
	let minToggle = rangeFilter.querySelector('.min-toggle');
	let maxToggle = rangeFilter.querySelector('.max-toggle');
	let minPriceInput = rangeFilter.querySelector('.min-price');
	let maxPriceInput = rangeFilter.querySelector('.max-price');
	let bar = rangeFilter.querySelector('.bar');
	minToggle.position = MIN_TOGGLE_POSITION;
	maxToggle.position = MAX_TOGGLE_POSITION;
	minToggle.style.left = MIN_TOGGLE_POSITION + 'px';
	maxToggle.style.left = MAX_TOGGLE_POSITION + 'px';
	minPriceInput.value = MIN_PRICE;
	maxPriceInput.value = MAX_PRICE;

	let moveToggle = function(toggle) {

		let onMouseDown = function(evt) {
			evt.preventDefault();
			let startCoordX = evt.clientX;
			let toggleLeft;	

			let onMouseMove = function(moveEvt) {
				moveEvt.preventDefault();
				let shift = startCoordX - moveEvt.clientX;
				startCoordX = moveEvt.clientX;
				toggleLeft = toggle.offsetLeft - shift;
				toggle.style.left = toggleLeft + 'px';

				if (toggle === minToggle) {
					if (toggleLeft < MIN_TOGGLE_POSITION) {
					toggle.style.left = MIN_TOGGLE_POSITION + 'px';
					}
					if (toggleLeft > maxToggle.position - TOGGLE_WIDTH) {
					toggle.style.left = maxToggle.position - TOGGLE_WIDTH + 'px';
					}
				} else {
					if (toggleLeft < minToggle.position + TOGGLE_WIDTH) {
					toggle.style.left = minToggle.position + TOGGLE_WIDTH + 'px';
					}
					if (toggleLeft > MAX_TOGGLE_POSITION) {
					toggle.style.left = MAX_TOGGLE_POSITION + 'px';
					}
				}

				if (toggle === minToggle) {
					let inputValue = Math.round(MAX_PRICE * (toggleLeft - MIN_TOGGLE_POSITION) / (MAX_TOGGLE_POSITION - MIN_TOGGLE_POSITION - TOGGLE_WIDTH) / INPUT_PRECISION) * INPUT_PRECISION;
					if (inputValue < MIN_PRICE) {
						inputValue = MIN_PRICE;
					}
					if (inputValue > MAX_PRICE) {
						inputValue = MAX_PRICE;
					}
					if (inputValue > maxPriceInput.value) {
						inputValue = maxPriceInput.value;
					}
					minPriceInput.value = inputValue;
				} else {
					let inputValue = Math.round(MAX_PRICE * (toggleLeft - MIN_TOGGLE_POSITION - TOGGLE_WIDTH) / (MAX_TOGGLE_POSITION - MIN_TOGGLE_POSITION - TOGGLE_WIDTH) / INPUT_PRECISION) * INPUT_PRECISION;
					if (inputValue < MIN_PRICE) {
						inputValue = MIN_PRICE;
					}
					if (inputValue > MAX_PRICE) {
						inputValue = MAX_PRICE;
					}
					if (inputValue < minPriceInput.value) {
						inputValue = minPriceInput.value;
					}
					maxPriceInput.value = inputValue;
				}
			}
			let onMouseUp = function(upEvt) {
				upEvt.preventDefault();
				document.removeEventListener('mouseup', onMouseUp);
				document.removeEventListener('mousemove', onMouseMove);
				toggle.position = toggleLeft;
			}
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		}
		
		toggle.addEventListener('mousedown', function() {
			onMouseDown(event);
		});
		
	}
	moveToggle(minToggle);
	moveToggle(maxToggle);

	// MutationObserver - bar

	const observerConfig = {
		attributes: true
	}
	const onToggleMove = function(mutation, observer) {
		// console.log('The ' + mutation[0].attributeName + ' attribute was modified.');
		let minToggleLeft = minToggle.style.left.slice(0, minToggle.style.left.length - 2);
		let maxToggleLeft = maxToggle.style.left.slice(0, maxToggle.style.left.length - 2);

		bar.style.left = (minToggleLeft - TOGGLE_WIDTH/2) + 'px';
		bar.style.width = (maxToggleLeft - minToggleLeft - TOGGLE_WIDTH) + 'px';
	}

	const leftToggleObserver = new MutationObserver(onToggleMove);
	const rightToggleObserver = new MutationObserver(onToggleMove);
	leftToggleObserver.observe(minToggle, observerConfig);
	rightToggleObserver.observe(maxToggle, observerConfig);

	//

	let priceChange = function(price) {
		let priceRound = Math.round(price);
		if (price < MIN_PRICE) {
			priceRound = MIN_PRICE;
		} else if (price > MAX_PRICE) {
			priceRound = MAX_PRICE;
		} else if (price < + minPriceInput.value) {
			priceRound = + minPriceInput.value;
		} else if (price > + maxPriceInput.value) {
			priceRound = + maxPriceInput.value;
		} 
		let togglePosition = Math.round((MAX_TOGGLE_POSITION - MIN_TOGGLE_POSITION - TOGGLE_WIDTH) * price / MAX_PRICE);
		return {
			price: priceRound,
			left: togglePosition
		}
	};

	minPriceInput.addEventListener('change', function() {
		minPriceInput.value = priceChange(minPriceInput.value).price;
		minToggle.style.left = priceChange(minPriceInput.value).left + MIN_TOGGLE_POSITION + 'px';
	});
	maxPriceInput.addEventListener('change', function() {
		maxPriceInput.value = priceChange(maxPriceInput.value).price;
		maxToggle.style.left = priceChange(maxPriceInput.value).left + MIN_TOGGLE_POSITION + TOGGLE_WIDTH + 'px';
	});
})();