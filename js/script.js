// ==================================================================================================================
const global = {
  currentPage: window.location.pathname,
}

// Display Popular Movies ================================================================================================
async function displayPopularMovies() {
  // Destructur results since the movie data returns an obj with our data in a results array
  const { results } = await fetchAPIData('movie/popular')

  results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
      />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
    `

    document.querySelector('#popular-movies').appendChild(div)
  })
}

// Fetch data from TMDB API ================================================================================================
async function fetchAPIData(endpoint) {
  const API_KEY = '45683cbb6a8af699dc7727a6b6fdd6f6'
  const API_URL = 'https://api.themoviedb.org/3/'

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)

  const data = await response.json()

  return data
}

// Highlight Active Link ===================================================================================================
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link')

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}

// Init App ==========================================================================================================
function init() {
  // Getting current page / routing
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies()
      break
    case '/shows.html':
      console.log('Shows')
      break
    case '/movie-details.html':
      console.log('Move Details')
      break
    case '/tv-details.html':
      console.log('TV Details')
      break
    case '/search.html':
      console.log('Search')
      break
  }

  // Highligh the active link
  highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
