import  {addToFavourites} from "./main.js";

export {
  STORAGE,
}

const STORAGE = {
  setItem(cityName, favourites) {
    localStorage.setItem('currentCity', cityName)
    localStorage.setItem('favourites', JSON.stringify(favourites))
  },

  showItem() {
    let arr = localStorage.getItem('favourites')
    if (arr !== null) {
      JSON.parse(arr).forEach(item => addToFavourites(item))
    }
  },


  deleteItem() {

  },
}

