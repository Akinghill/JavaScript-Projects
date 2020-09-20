const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')
const imagesContainer = document.querySelector('.images-container')
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// Nasa API
const count = 10
const apiKey = 'eA2QQZIMQsyrQ03yR8JjSdg2WNxaiHT31rYbE6ud'
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

let resultsArray = []

function updateDOM() {
  console.log('updating dom');

  resultsArray.forEach((result, i) => {
    console.log('making a pic:', i);

    // Card Container
    const card = document.createElement('div')
    card.classList.add('add')
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
    image.classList.add('card')
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
    saveText.textContent = 'Add To Favorites'
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
    console.log(card);
    // Append
    footer.append(date, copyright)
    cardBody.append(cardTitle, saveText, cardText, footer)
    link.appendChild(image)
    card.append(link, cardBody)
    imagesContainer.appendChild(card)
  })
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  try {
    console.log('getting nasa pics');
    const response = await fetch(apiUrl)
    resultsArray = await response.json()
    console.log(resultsArray);
    updateDOM()
  } catch (error) {
    console.log('unable to get pics');
  }
}

// On Load
getNasaPictures()