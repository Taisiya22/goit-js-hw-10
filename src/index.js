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
    list.innerHTML = '';
    info.innerHTML = '';
    return;
   } 
  
    fetchCountries(inputValue)
      .then(renderCountryList)
      .catch(onError)
 
}

function renderCountryList(countries) { 
   list.innerHTML = countries.reduce((acc, { name: { official }, flags: { svg } }) => {return acc +  `<li>
  <img src="${svg}" alt="flag" width = 200px>
  <p><b>${official}</b></p>
</li>`}, '')
  
  if (countries.length === 1) { 
     info.innerHTML = countries.reduce((acc, { flags: { svg }, name: { official }, capital, population, languages }) => {
      return acc +  
      `<p><b>Capital:</b> ${capital}</p>
       <p><b>Population:</b> ${population}</p>
       <p><b>Languages:</b> ${Object.values(languages)}</p>`
       }, '')
  }

  if (countries.length > 10) {
    info.innerHTML = '';
    list.innerHTML = '';
    Notiflix.Notify.info('"Too many matches found. Please enter a more specific name."');
  }
  
}

function onError(error) { 
  console.error(error);
  Notiflix.Notify.failure("Oops, there is no country with that name");
   list.innerHTML = '';
    info.innerHTML = '';
  return error;
}
