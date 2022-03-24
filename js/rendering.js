import {ASIDE_LIST, REUSABLE_ELEMENTS, TAB_DETAILS_ELEMENTS, TAB_FORECAST_ELEMENTS} from "./view.js";
import {deleteFavourite} from "./main.js";

export {
  RENDERING
}

const RENDERING = {
  render(response) {
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
  },

  createElement() {
    const asideItem = document.createElement('li')
    const asideCity = document.createElement('span')
    const asideButtonClose = document.createElement('span')
    asideItem.className = 'aside__item'
    asideCity.className = 'aside__city'

    asideButtonClose.textContent = 'x'
    asideButtonClose.className = 'aside__button-close'
    asideButtonClose.addEventListener('click', deleteFavourite)

    return {
      ITEM: asideItem,
      CITY: asideCity,
      BUTTON_CLOSE: asideButtonClose,
    }
  },

  addElement() {
    const ELEMENTS = this.createElement()
    ELEMENTS.CITY.textContent = localStorage.getItem('currentCity')
    ASIDE_LIST.append(ELEMENTS.ITEM)
    ELEMENTS.ITEM.append(ELEMENTS.CITY)
    ELEMENTS.ITEM.append(ELEMENTS.BUTTON_CLOSE)
  },

  changeTab(event) {
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
}