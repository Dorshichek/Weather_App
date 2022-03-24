import {
  TABS,
  CONTROLS,
  TAB_NOW_ELEMENTS,
  TAB_DETAILS_ELEMENTS,
  TAB_FORECAST_ELEMENTS,
  REUSABLE_ELEMENTS,
  ASIDE_LIST,
} from "./view.js";
import {showErrors} from "./showerror.js";
import {STORAGE} from "./STORAGE.js";


function init() {
  TAB_NOW_ELEMENTS.ADD_FAVORITES.addEventListener('click', addToFavourites)

  for (let listener in TABS) {
    addEventListener('click', changeTab)
  }

  CONTROLS.INPUT.addEventListener('input', function () {
    if (this.value !== '') {
      this.value = this.value[0].toUpperCase() + this.value.slice(1)
    }
  })

  CONTROLS.BUTTON_SEARCH.addEventListener('click', getCityWeather)

  STORAGE.showItem()
}

function changeTab(event) {
  const tabClassName = 'main-block__item'
  if (!(event.target.className === tabClassName)) {
    return
  }

  const activeTab = document.getElementsByClassName('active-tab')[0]
  if (activeTab) {
    activeTab.classList.remove('active-tab')
  }
  event.target.classList.add('active-tab')
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

    const temperature = response.main.temp - 273.15
    let sunrise = new Date(response.sys.sunrise * 1000)
    let sunset = new Date(response.sys.sunset * 1000)
    let hours_Now = new Date().getHours()
    let minutes_Now = new Date().getMinutes()
    let date = new Date().toDateString().split(' ')
    let dateMonth = date[1]
    let dateDay = date[2]

    REUSABLE_ELEMENTS.CITY[0].textContent = response.name
    REUSABLE_ELEMENTS.TEMPERATURE[0].textContent = (temperature).toFixed(0) + '°'

    REUSABLE_ELEMENTS.CITY[1].textContent = response.name
    REUSABLE_ELEMENTS.TEMPERATURE[1].textContent = (temperature).toFixed(0) + '°'
    REUSABLE_ELEMENTS.FEELS_LIKE[0].textContent = (temperature).toFixed(0) + '°'
    REUSABLE_ELEMENTS.WEATHER_NOW[0].textContent = response.weather[0].main
    TAB_DETAILS_ELEMENTS.SUNRISE.textContent = sunrise.getHours() + ':' + sunrise.getMinutes()
    TAB_DETAILS_ELEMENTS.SUNSET.textContent = sunset.getHours() + ':' + sunset.getMinutes()

    TAB_FORECAST_ELEMENTS.DATE.textContent = dateDay + ' ' + dateMonth
    TAB_FORECAST_ELEMENTS.TIME.textContent = hours_Now + ':' + minutes_Now
    REUSABLE_ELEMENTS.TEMPERATURE[2].textContent = (temperature).toFixed(0) + '°'
    REUSABLE_ELEMENTS.CITY[2].textContent = response.name
    REUSABLE_ELEMENTS.FEELS_LIKE[1].textContent = (temperature).toFixed(0) + '°'
    REUSABLE_ELEMENTS.WEATHER_NOW[1].textContent = response.weather[0].main

  } catch {
    showErrors()
  }
  CONTROLS.INPUT.value = ''
}

let favourites = new Set()

// let favourites = []

export function addToFavourites(city) {
  let cityName = null
  if (typeof city === 'object') {
    cityName = REUSABLE_ELEMENTS.CITY[0].textContent
  } else {
    cityName = city
  }

  // let hasCity = favourites.values(cityName)
  const asideItem = document.createElement('li')
  const asideCity = document.createElement('span')
  const asideButtonClose = document.createElement('span')
  asideItem.className = 'aside__item'
  asideCity.className = 'aside__city'

  asideButtonClose.textContent = 'x'
  asideButtonClose.className = 'aside__button-close'
  asideButtonClose.addEventListener('click', deleteFavourite)


  favourites.add(cityName)
  STORAGE.setItem(cityName, favourites)
  asideCity.textContent = localStorage.getItem('currentCity')
  ASIDE_LIST.append(asideItem)
  asideItem.append(asideCity)
  asideItem.append(asideButtonClose)
  console.log(favourites)

  // if (!hasCity) {
  //
  // }

  // if (!hasCity) {
  //
  // }
}


function deleteFavourite() {
  favourites.pop(this.parentElement.firstChild.textContent)
  this.parentElement.remove();
}

init()
