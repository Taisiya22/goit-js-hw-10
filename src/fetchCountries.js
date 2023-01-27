const ENDPOINTS = 'https://restcountries.com/v3.1'


export function fetchCountries(name) {
   return fetch(`${ENDPOINTS}/name/${name}?fields=name,capital,population,flags,languages`)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(responce.status);
            }
            return responce.json();
        });
}
        