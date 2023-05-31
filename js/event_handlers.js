let onClickMovie = (e) => {
	const id = e.currentTarget.getAttribute('data-id');
	alert(`영화 id: ${id}`);
};

let handleSubmit = (e) => {
	e.preventDefault();
	const inputValue = document.querySelector('.search-box input').value;

	if (inputValue) {
		const filteredMovies = movies.filter((movie) => {
			if (movie.title.match(new RegExp(inputValue, 'i'))) {
				return movie;
			}
		});
		drawMovies(filteredMovies);
	}
  else {
    drawMovies(movies)
  }
};

