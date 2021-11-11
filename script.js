'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
	//fetch first country
	fetch(`https://restcountries.com/v2/name/${country}`)
		.then((response) => response.json())
		.then((data) => {
			renderCountry(data[0]);
			const neighbor = data[0].borders[0];
			if (!neighbor) return;

			//fetch neighboring country

			return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
		})
    .then(res => res.json())
    .then (data => renderCountry(data, 'neighbor'))
};


const renderCountry = function (data, className = '') {
	const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
			+data.population / 1000000
		).toFixed(1)} Million</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}
</article>`;
	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};

