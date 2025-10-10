
//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      getCountries();
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

let url = `https://restcountries.com/v3.1/region/america`;
const main = document.querySelector('main');

async function getCountries() {
  const res = await fetch(url);
  const data = await res.json();
  main.innerHTML = data.map(createCountryCard).join('');
}

function createCountryCard(country) {
  return `
    <div class="country-card">
      <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" class="flag">
      <h2>País: ${country.name.common}</h2>
      <p>Capital: ${country.capital ? country.capital[0] : 'Não informada'}</p>
    </div>
  `;
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const value = searchInput.value.trim();

  if (value === '') {
    alert('Digite o nome de um país!');
    return;
  }

  url = `https://restcountries.com/v3.1/name/${encodeURIComponent(value)}`;
  getCountries();
});
