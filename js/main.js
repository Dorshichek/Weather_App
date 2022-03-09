import {TAB_ELEMENTS, INPUT_ELEMENTS, TAB_NOW_ELEMENTS} from "./view.js";
import {showErrors} from "./show.js";
// import {likeAnimation} from "./animation.js";

for (let listener in TAB_ELEMENTS) {
  addEventListener('click', changeTab)
}

INPUT_ELEMENTS.INPUT.addEventListener('input', function () {
  this.value = this.value[0].toUpperCase() + this.value.slice(1)
})

INPUT_ELEMENTS.BUTTON_SEARCH.addEventListener('click', getCityWeather)

function changeTab(event) {
  const isTab = event.target.className === 'main-block__item'
  const activeTab = document.getElementsByClassName('active-tab')
  const currentActive = activeTab[0]

  if (isTab) {
    event.target.classList.add('active-tab')
  }

  if (currentActive && isTab) {
    currentActive.classList.remove('active-tab')
  }
}

function getCityWeather() {
  const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = INPUT_ELEMENTS.INPUT.value;
  const apiKey = '1041b355b3b6422eb66d9f5e517f7b52';
  const url = `${SERVER_URL}?q=${cityName}&appid=${apiKey}`;
  const CELSIUS_IMPORT = 273.15

  const request = fetch(url)
  const promise = request.then((response) => response.json())
  promise.then((result) => {
    TAB_NOW_ELEMENTS.CITY.textContent = result.name
    TAB_NOW_ELEMENTS.TEMPERATURE.textContent = (result.main.temp - CELSIUS_IMPORT).toFixed(0) + '°'
  }).catch(showErrors)
  INPUT_ELEMENTS.INPUT.value = ''
}

