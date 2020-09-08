const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const favoriteBtn = document.getElementById('favorite');
const newQuoteBtn = document.getElementById('new-quote');
const optionsContainer = document.querySelector('.option-buttons')
const optionsBtn = document.querySelector('.fa-list')
const cleanBtn = document.querySelector('.clean-favs')
const loader = document.getElementById('loader');

let favQuotes = [];
let errorCount = 0;

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get quote from api
async function getQuote() {
  showLoader();
  // Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If there is no author, display "Unknown" as author
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // If quote is too long, add class to decrease font size
    if (data.quoteText.length < 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;

    hideLoader();
  } catch (err) {
    errorCount++
    if (errorCount < 5) {
      getQuote();
    } else {
      errorCount = 0;
      console.log('Whoops no quote', err);
    }
  }
}

function getFavorites() {
  if (localStorage.getItem('favQuotes')) {
    favQuotes = JSON.parse(localStorage.getItem('favQuotes'))
  } else {
    // Create favoriteQuotes array in localStorage
    favQuotes = []
    localStorage.setItem('favQuotes', JSON.stringify(favQuotes))
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

function favoriteQuote() {
  console.log('quote added to favs')
  const quoteStr = quoteText.innerText
  let authorStr = authorText.innerText

  const favQuote = {
    "quote": quoteStr,
    "author": authorStr
  }

  favQuotes.push(favQuote)
  localStorage.setItem('favQuotes', JSON.stringify(favQuotes))
}

function cleanFavs(){
  favQuotes = []
  localStorage.setItem('favQuotes', JSON.stringify(favQuotes))
}


// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
favoriteBtn.addEventListener('click', favoriteQuote);
cleanBtn.addEventListener('click', cleanFavs);

// On Load
getQuote();
getFavorites();
