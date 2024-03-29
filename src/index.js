import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const inputText = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

inputText.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));


function onSearchCountry(e) { 
  let inputValue = e.target.value.trim();
  if (inputValue === '') {
    Notiflix.Notify.warning('Entry name country!');
    clearMarkup();
    return;
   } 
  
    fetchCountries(inputValue)
      .then(renderCountryList)
      .catch(onError)
 
}

function renderCountryList(countries) { 
   list.innerHTML = countries.reduce((acc, { name: { official }, flags: { svg } }) => {return acc +  `<li>
  <img src="${svg}" alt="flag" width = 100px>
  <p><b>${official}</b></p>
</li>`}, '')
  
  if (countries.length === 1) { 
     info.innerHTML = countries.reduce((acc, { capital, population, languages }) => {
      return acc +  
      `<p><b>Capital:</b> ${capital}</p>
       <p><b>Population:</b> ${population}</p>
       <p><b>Languages:</b> ${Object.values(languages)}</p>`
       }, '')
  }

  if (countries.length > 10) {
    clearMarkup();
    Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
  }
  
}

function onError(error) { 
  console.error(error);
  Notiflix.Notify.failure("Oops, there is no country with that name");
  clearMarkup();
  return error;
}
  
function clearMarkup() { 
   list.innerHTML = '';
   info.innerHTML = '';
}