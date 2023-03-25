import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

const handleRequestNameCountry = event => {
  const searchQuery = event.target.value.trim();

  if (!searchQuery) {
    listEl.innerHTML = '';
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (data.length <= 10 && data.length >= 2) {
        listEl.innerHTML = '';
        createMarkupListMoreTwoCountries(data);
      } else if (data.length === 1) {
        listEl.innerHTML = '';
        createMarkupListOneCountries(data);
      }
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
};

const createMarkupListMoreTwoCountries = array => {
  const markup = array
    .map(({ name, flags }) => {
      return `<li>
                        <img src="${flags.svg}" alt="${name}" width="50" height="auto">
                        <h2>${name.official}</h2>
                </li>`;
    })
    .join('');

  listEl.insertAdjacentHTML('beforeend', markup);
};

const createMarkupListOneCountries = data => {
  const markup = data
    .map(({ flags, name, capital, population, languages }) => {
      languages = Object.values(languages).join(', ');
      return `<li>
            <img src="${flags.svg}" alt="${name}" width="50" height="auto">
            <h2> ${name.official}</h2>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p></li>`;
    })
    .join('');
  listEl.insertAdjacentHTML('beforeend', markup);
};

inputEl.addEventListener(
  'input',
  debounce(handleRequestNameCountry, DEBOUNCE_DELAY)
);
