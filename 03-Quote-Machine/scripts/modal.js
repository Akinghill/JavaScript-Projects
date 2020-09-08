const favsModal = document.getElementById('favs-modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')

const favList = document.getElementById('quote-fav-list')



// Show Modal, Focus on Input
function showModal() {
  quoteContainer.classList.add('display-none')
  favsModal.classList.add('show-modal')

  favsModal.focus()
  loadFavQuotes()
}

function loadFavQuotes(){
  favList.textContent = '';

  if(favQuotes.length < 1){
    favList.textContent = "No favorite quotes yet."
  }

  favQuotes.map((quoteObj) => {
    const { author, quote } = quoteObj
    const newQuote= document.createElement('li')
    newQuote.classList.add('single-quote')

    const quoteContent= document.createElement('div')
    quoteContent.classList.add('fav-quote')
    quoteContent.textContent = quote
    newQuote.append(quoteContent)

    const authorContent= document.createElement('div')
    authorContent.classList.add('fav-author')
    authorContent.textContent = `-${author}`
    newQuote.append(authorContent)

    favList.append(newQuote)
  })
}

/*
Build this
 <li class="single-quote">
    <div class="fav-quote">lalalall</div>
    <div class="fav-author">lalalall</div>
  </li>
*/ 

// Modal Event Listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => {
  favsModal.classList.remove('show-modal')
  quoteContainer.classList.remove('display-none')
})
// window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false))