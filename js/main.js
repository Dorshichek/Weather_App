import {TAB_ELEMENTS} from "./view.js";

for (let listener in TAB_ELEMENTS) {
  addEventListener('click', changeTab)
}

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

