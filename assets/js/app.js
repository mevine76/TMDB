const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const upComing= document.querySelector(".up")


const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
  }
};

fetch('https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1', options2)
  .then(response => response.json())
  .then(response => {
    for (const moviesUpcoming of response.results) {
        upComing.innerHTML+= `
          
        <img src="https://image.tmdb.org/t/p/w500${moviesUpcoming.poster_path}" width="350px" alt="${moviesUpcoming.title}">
        <div class="movie-info">
            <h3>${moviesUpcoming.title}</h3>
            
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${moviesUpcoming.overview}
        </div>

    `
    }
    
  }
    
   )
  .catch(err => console.error(err));

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUzN2Y1YTU4ZTQ3ZGIwMGY4NTkyODU3OWY5MDBmOCIsInN1YiI6IjY0NmUxNjEzMzNhMzc2MDE1OGRjMDRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.10TTdpPPusGwjBn81duAdGN3P84qd250flrJJOeCyEs'
    }
};


async function getMovies(movie) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=fr-FR&page=1`, options)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    upComing.remove()
    main.innerHTML = ''
    

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')


        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>

        `
        main.appendChild(movieElement)
    })
}

function getClassByRate(vote) {
    let resu = vote.toFixed(1)
    if (resu >= 8) {
        return 'green'
    } else if (resu >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value
    console.log(searchTerm)


    if (searchTerm && searchTerm !== '') {
        console.log(searchTerm)

        getMovies(searchTerm)

    } else {
        window.location.reload
    }

})