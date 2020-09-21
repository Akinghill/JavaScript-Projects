const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')
const imagesContainer = document.querySelector('.images-container')
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// Nasa API
const count = 10
const apiKey = 'eA2QQZIMQsyrQ03yR8JjSdg2WNxaiHT31rYbE6ud'
const demoKey = 'DEMO_KEY'

const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${demoKey}&count=${count}`

let resultsArray = []
let favorites = {}

function showContent(page) {
  window.scrollTo({ top: 0, behavior: 'instant' })
  loader.classList.add('hidden');
  if (page === 'result') {
    resultsNav.classList.remove('hidden')
    favoritesNav.classList.add('hidden')
  } else {
    favoritesNav.classList.remove('hidden')
    resultsNav.classList.add('hidden')
  }
}

function createDOMNodes(page) {
  const currentArray = page === 'result' ? resultsArray : Object.values(favorites)

  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div')
    card.classList.add('card')
    // Link
    const link = document.createElement('a')
    link.href = result.hdurl
    link.title = 'View Full Image'
    link.target = '_blank'
    // Image
    const image = document.createElement('img')
    image.src = result.url
    image.alt = 'NASA Picturer of the Day'
    image.loading = 'lazy'
    image.classList.add('card-img-top')
    // Card Body
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    // Card Title
    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = result.title
    // Save Text
    const saveText = document.createElement('p')
    saveText.classList.add('clickable')
    if (page === 'result') {
      saveText.textContent = 'Add To Favorites'
      saveText.setAttribute('onclick', `saveFavorite('${result.url}')`)
    } else {
      saveText.textContent = 'Remove Favorite'
      saveText.setAttribute('onclick', `removeFavorite('${result.url}')`)
    }
    // saveText.onclick = `saveFavorite('${result.url}')`
    // Card Text
    const cardText = document.createElement('p')
    cardText.textContent = result.explanation
    // Footer Container
    const footer = document.createElement('small')
    footer.classList.add('text-muted')
    // Date
    const date = document.createElement('strong')
    date.textContent = result.date
    // Copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span')
    copyright.textContent = ` ${copyrightResult}`
    // Append
    footer.append(date, copyright)
    cardBody.append(cardTitle, saveText, cardText, footer)
    link.appendChild(image)
    card.append(link, cardBody)
    imagesContainer.appendChild(card)
  })
}

// Add result to favorites
function saveFavorite(itemUrl) {
  // Loop through results array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item
      // Show saved confirmation for 2 seconds
      saveConfirmed.hidden = false
      setTimeout(() => {
        saveConfirmed.hidden = true
      }, 2000)
      // Set Favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    }
  })
}

// Remove Favorite 
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl]
    // Set Favorites in localStorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    updateDOM('favorites')
  }
}

function updateDOM(page) {
  // Get favorites from localStorage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'))
  }
  imagesContainer.textContent = ''
  createDOMNodes(page)
  showContent(page)
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden')
  try {
    const response = await fetch(apiUrl)
    resultsArray = await response.json()
    updateDOM('result')
  } catch (error) {
    console.log('unable to get pictures');
  }
}

// On Load
getNasaPictures()