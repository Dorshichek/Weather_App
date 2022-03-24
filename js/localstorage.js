import {addToFavourites} from "./main.js";

export {
  STORAGE
}

const STORAGE = {
  update(favourites) {
    let tempArray = Array.from(favourites)
    return localStorage.setItem('favourites', JSON.stringify(tempArray))
  },

  setCurrencyCity(cityName) {
    return localStorage.setItem('currentCity', cityName)
  },

  load() {
    let arr = localStorage.getItem('favourites')
    if (arr !== null) {
      return JSON.parse(arr).forEach(item => addToFavourites(item))
    }
  },
}

