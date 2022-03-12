export const TABS = {
  TAB_NOW: document.querySelectorAll('.main-block__item')[0],
  TAB_DETAILS: document.querySelectorAll('.main-block__item')[1],
  TAB_FORECAST: document.querySelectorAll('.main-block__item')[2],
}

export const CONTROLS = {
  INPUT : document.querySelector('.weather-app__input'),
  BUTTON_SEARCH : document.querySelector('.weather-app__search'),
}

export const TAB_NOW_ELEMENTS = {
  ADD_FAVORITES: document.querySelector('.weather__add-favorites'),
  WEATHER_IMG: document.querySelector('.weather__img'),
}

export const TAB_DETAILS_ELEMENTS = {
  SUNRISE: document.querySelector('.weather__sunrise'),
  SUNSET: document.querySelector('.weather__sunset'),
}

export const TAB_FORECAST_ELEMENTS = {
  DATE: document.querySelector('.weather__date'),
  TIME: document.querySelector('.weather__time'),
}

export const REUSABLE_ELEMENTS = {
  TEMPERATURE: document.querySelectorAll('.grad'),
  CITY: document.querySelectorAll('.weather__city'),
  FEELS_LIKE: document.querySelectorAll('.weather__feels-like'),
  WEATHER_NOW: document.querySelectorAll('.weather__weather-now'),
}

export const ASIDE_LIST = document.querySelector('.aside__list')