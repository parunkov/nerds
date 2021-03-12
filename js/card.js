'use strict';
;
(function() {
	ymaps.ready(init);
	function init() {
		var myMap = new ymaps.Map('map', {
			center: [45.043323, 38.944240],
			zoom: 15
		});
		// var myPlacemark = new ymaps.GeoObject({
		// 	geometry: {
		// 		type: "Point",
		// 		coordinates: [45.043323, 38.944240]
		// 	}
		// });
		var myPlacemark = new ymaps.Placemark([45.043323, 38.944240], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/ballon.png',
			iconImageSize: [231, 190],
			iconImageOffset: [-48, -190]
		});
		myMap.geoObjects.add(myPlacemark);
	}
})();