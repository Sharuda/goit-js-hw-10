const BASE_URL = `https://restcountries.eu`;

export const fetchCountries = name =>
  fetch(`${BASE_URL}/rest/v2/name/${name}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
