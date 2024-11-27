window.addEventListener('load', () => {
    fetchData(`https://www.omdbapi.com/?i=tt3896198&apikey=4634a2f8`)
        .then(data => {
            createCard(data);
            setExtraInfo(data);
        })
})

async function fetchData(apiKey) {
    try {
        const response = await fetch(apiKey);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}

document.getElementById('close-modal')
    .addEventListener('click', () => {
        let elem = document.getElementById('info-modal');
        elem.classList.add('hidden');
        let overlayElem = document.querySelector('.overlay');
        overlayElem.classList.add('hidden');
    })

function createCard(data) {
    let moviePoster = document.getElementById('movie-poster');
    let movieTitle = document.getElementById('movie-title');
    let movieReleaseYear = document.getElementById('movie-releaseyear');

    if (data.Error) {
        moviePoster.setAttribute('src', './images/error-sign.jpg');
        movieTitle.innerHTML = data.Error;
        movieReleaseYear.innerHTML = 'Try again with correct movie credentials';
        return false;
    }

    moviePoster.setAttribute('src', data.Poster)
    movieTitle.innerHTML = data.Title;
    movieReleaseYear.innerHTML = data.Released.split(' ')[2];
    return true;
}

function checkInput(input) {
    if (!input) return false;

    return true;
}

function getInput() {
    const input = document.getElementById('input').value.trim();

    if (!checkInput(input)) return;

    fetchData(`https://www.omdbapi.com/?i=tt3896198&apikey=4634a2f8&t=${input}`)
        .then(data => {
            createCard(data);
            setExtraInfo(data);
        })
}

function showMoreInfo() {
    let elem = document.getElementById('info-modal');
    elem.classList.remove('hidden');

    let overlayElem = document.querySelector('.overlay');
    overlayElem.classList.remove('hidden');
}

function setExtraInfo(data) {
    let modalHeading = document.getElementById('modal-heading');
    let genre = document.getElementById('genre');
    let director = document.getElementById('director');
    let writers = document.getElementById('writer');
    let actors = document.getElementById('actors');
    let plot = document.getElementById('plot');

    let genreSpan = document.getElementById('genre-span');
    let directorSpan = document.getElementById('director-span');
    let writersSpan = document.getElementById('writer-span');
    let actorsSpan = document.getElementById('actors-span');
    let plotSpan = document.getElementById('plot-span');

    console.log(directorSpan);

    if (data.Error) {
        modalHeading.innerHTML = 'Error getting the movie.';
        genre.innerHTML = '';
        director.innerHTML = '';
        writers.innerHTML = '';
        actors.innerHTML = '';
        plot.innerHTML = '';

        genreSpan.innerHTML = '';
        directorSpan.innerHTML = '';
        writersSpan.innerHTML = '';
        actorsSpan.innerHTML = '';
        plotSpan.innerHTML = '';

        return;
    }

    modalHeading.innerHTML = data.Title;
    genre.innerHTML = data.Genre;
    director.innerHTML = data.Director;
    writers.innerHTML = data.Writer;
    actors.innerHTML = data.Actors;
    plot.innerHTML = data.Plot;

    genreSpan.innerHTML = 'Genre:';
    directorSpan.innerHTML = 'Director:';
    writersSpan.innerHTML = 'Writers:';
    actorsSpan.innerHTML = 'Actors:';
    plotSpan.innerHTML = 'Plot:';
}