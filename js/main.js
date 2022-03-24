import {
  TABS,
  CONTROLS,
  TAB_NOW_ELEMENTS,
  REUSABLE_ELEMENTS,
} from "./view.js";
import {showErrors} from "./showerror.js";
import {STORAGE} from "./localstorage.js";
import {RENDERING} from "./rendering.js";

export {
  deleteFavourite, addToFavourites
}

function init() {
  TAB_NOW_ELEMENTS.ADD_FAVORITES.addEventListener('click', addToFavourites)

  for (let listener in TABS) {
    addEventListener('click', RENDERING.changeTab)
  }

  CONTROLS.INPUT.addEventListener('input', function () {
    if (this.value !== '') {
      this.value = this.value[0].toUpperCase() + this.value.slice(1)
    }
  })

  CONTROLS.BUTTON_SEARCH.addEventListener('click', getCityWeather)

  STORAGE.load()
}

async function getCityWeather() {
  event.preventDefault()
  const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const cityName = CONTROLS.INPUT.value;
  const API_KEY = '97f36208f41daeec8c857deb48d7e06c';
  const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;

  try {
    const request = await fetch(url)
    const response = await request.json()
    RENDERING.render(response)
  } catch {
    showErrors()
  }
  CONTROLS.INPUT.value = ''
}

let favourites = new Set()

function addToFavourites(city) {
  let cityName
  if (typeof city === 'object') {
    cityName = REUSABLE_ELEMENTS.CITY[0].textContent
  } else {
    cityName = city
  }
  RENDERING.createElement()

  if (!favourites.has(cityName)) {
    favourites.add(cityName)
    STORAGE.update(favourites)
    STORAGE.setCurrencyCity(cityName)
    RENDERING.addElement()
  }
}

function deleteFavourite() {
  favourites.delete(this.parentElement.firstChild.textContent)
  STORAGE.update(favourites)
  this.parentElement.remove();
}

init()
