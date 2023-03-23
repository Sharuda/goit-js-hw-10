import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');

const handleRequestNameCountry = event => {
  const searchQuery = event.target.value.trim();

  fetchCountries(searchQuery).then(data => console.log(data));
};

inputEl.addEventListener(
  'input',
  debounce(handleRequestNameCountry, DEBOUNCE_DELAY)
);
