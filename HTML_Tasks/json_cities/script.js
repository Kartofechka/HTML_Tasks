const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let clear_arr = [];
let currentResults = [];
let currentIndex = 0;
let isReversed = false;

const city = document.getElementById('city');
const city_divs = document.getElementById('city-divs');
const button = document.getElementById('search');
const load_more_btn = document.getElementById('load-more');
const load_minus = document.getElementById('load-minus');
const rev_btn = document.getElementById('rev_btn');

fetch(url)
  .then(response => response.json())
  .then(data => {
    clear_arr = data;
  })
  .catch(error => console.log(error));

button.addEventListener('click', () => {
  const inputValue = city.value.toLowerCase();
  currentResults = clear_arr.filter(place =>
    place.city.toLowerCase().startsWith(inputValue)
  );
  currentIndex = 0;
  isReversed = false;
  showCities();
});

rev_btn.addEventListener('click', () => {
  isReversed = !isReversed;
  currentResults = isReversed ? [...clear_arr].reverse() : [...clear_arr];
  currentIndex = 0;
  showCities();
});


load_more_btn.addEventListener('click', () => {
  currentIndex += 10;
  showCities();
});

load_minus.addEventListener('click', () => {
  if (currentIndex >= 10) currentIndex -= 10;
  showCities();
});

function showCities() {
  city_divs.innerHTML = '';
  const slice = currentResults.slice(0, currentIndex + 10);
  slice.forEach(place => {
    const people = Number(place.population).toLocaleString();
    const state = place.state;
    const div = document.createElement('div');
    div.classList.add('city-card');
    div.innerHTML = `<strong>${place.city}</strong> | state: ${state}: ${people} burger eaters`;
    city_divs.appendChild(div);
  });

  load_more_btn.style.display = currentIndex + 10 < currentResults.length ? 'block' : 'none';
  load_minus.style.display = currentIndex >= 10 ? 'block' : 'none';
}