const { APIAURL, SEARCHAPI, IMGPATH } = config;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// initially gets movies
getMovies(APIAURL);


async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return `green`;
  } else if (vote >= 5) {
    return `orange`;
  } else {
    return `red`;
  }
}

function showMovies(movies) {
  // clear main
  main.innerHTML = '';

  movies.forEach((movie) => {
    let { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement('div');

    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${poster_path !== null ? IMGPATH + poster_path : `img/imgNoAvailable.jpeg`}"  alt="${title}">
          <div class="movie-info">
              <h3>${title} </h3>
              <span class="${getClassByRate(vote_average)}">${vote_average} </span>
          </div>

          <div class="overview">
          <h4>Overview:</h4>
          ${overview}
          </div>
    `
    main.appendChild(movieEl);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm)
    search.value = '';
  }
})

