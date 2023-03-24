import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

const handleRequestNameCountry = event => {
  const searchQuery = event.target.value.trim();

  fetchCountries(searchQuery).then(data => {
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    } else if (data.length <= 10 && data.length >= 2) {
      
    }
  });
};

inputEl.addEventListener(
  'input',
  debounce(handleRequestNameCountry, DEBOUNCE_DELAY)
);
