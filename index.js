const baseUrl = 'https://api.themoviedb.org/3/movie/top_rated';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
const options = {
	method: 'GET',
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmI1OTZjMmY3NDAzNDJlY2VhNTc3MzRmYmRkMzk1NSIsInN1YiI6IjY0NzFlYTA0OTQwOGVjMDEwMDI1MWNmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ops8vO4n2RQ40MWbUXo64hwKvh8EFlI6t_beidcYdA',
	},
};
let movies;
const moviesTag = document.querySelector('.movies');

let getFetchData = async (url, options) => {
	let res = await fetch(url, options);
	let data = await res.json();

	return data['results'];
};

let getMovies = async () => {
	let url = `${baseUrl}`;
	movies = await getFetchData(url, options);

	return movies;
};

let onClickMovie = (e) => {
	const id = e.currentTarget.getAttribute('data-id');
	alert(`영화 id: ${id}`);
};

let handleSubmit = (e) => {
	e.preventDefault();
	const inputValue = document.querySelector('.search-box input').value;

	if (inputValue) {
		const filteredMovies = movies.filter((movie) => {
			if (movie.title.includes(inputValue)) {
				return movie;
			}
		});
		moviesTag.innerHTML = '';
		drawMovies(filteredMovies);
	}
};

let drawMovies = (movies) => {
	for (const movie of movies) {
		const { id, title, poster_path, vote_average, overview } = movie;

		const card = document.createElement('div');
		card.className = 'movie';
		card.setAttribute('data-id', id);
		card.onclick = onClickMovie;

		const image = document.createElement('img');
		image.className = 'movie__img';
		image.src = `${imageBaseUrl}${poster_path}`;
		card.appendChild(image);

		const movieInfo = document.createElement('div');
		movieInfo.className = 'movie__info';
		card.appendChild(movieInfo);

		const movieTitle = document.createElement('h3');
		movieTitle.className = 'info__title';
		movieTitle.textContent = title;
		movieInfo.appendChild(movieTitle);

		const movieRating = document.createElement('p');
		movieRating.className = 'info__vote-average';
		movieRating.textContent = `Rating: ${vote_average}`;
		movieInfo.appendChild(movieRating);

		const movieOverview = document.createElement('p');
		movieOverview.className = 'info__overview';
		movieOverview.textContent = overview;
		movieInfo.appendChild(movieOverview);

		document.querySelector('.movies').appendChild(card);
	}
};

// entrypoint
getMovies().then((data) => {
	drawMovies(data);
});
