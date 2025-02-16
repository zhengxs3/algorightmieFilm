const movies = [];

async function fetchMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch movies.');
        const data = await response.json();

        for (const movie of data.results) {
            await fetchMovieDetails(movie.id);
        }
        return movies;
    } catch (error) {
        console.error("Error fetching data: ", error);
        alert('Failed to fetch movies.');
        return [];
    }
}

async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const movieDetails = await response.json();

        const movieFormatted = {
            title: movieDetails.title,
            year: movieDetails.release_date ? movieDetails.release_date.split('-')[0] : "Unknown",
            rating: movieDetails.vote_average.toFixed(1),
            duration: movieDetails.runtime || "Unknown",
            genre: movieDetails.genres.map(genre => genre.name)
        };
        movies.push(movieFormatted);

        return movieFormatted;
    } catch (error) {
        console.error("Could not fetch movie details: ", error);
    }
}

// 页面加载时获取电影数据
document.addEventListener("DOMContentLoaded", async () => {
    await fetchMovies();
    populateFilters();
    displayMovies(movies);

    const resetButton = document.getElementById("resetFilters");
    resetButton.addEventListener("click", () => {
        // Réinitialiser les filtres et afficher tous les films
        document.getElementById("genreFilter").value = "";
        document.getElementById("ratingFilter").value = "";
        document.getElementById("sortOption").value = "";
        applyFilters();
    });
});


function populateFilters() {
    const genreFilter = document.getElementById("genreFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const genres = new Set();
    const ratings = new Set();

    movies.forEach(movie => {
        movie.genre.forEach(genre => genres.add(genre));
        ratings.add(movie.rating);
    });

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

    ratings.forEach(rating => {
        const option = document.createElement("option");
        option.value = rating;
        option.textContent = rating;
        ratingFilter.appendChild(option);
    });
}

function displayMovies(filteredMovies) {
    filteredMovies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="https://place-hold.it/220x300" alt="${movie.title}">
            <h2>${movie.title} (${movie.year})</h2>
            <p class="rating">Note: ${movie.rating}</p>
            <p class="duration">Durée: ${movie.duration} min</p>
            <p>Genres: ${movie.genre.join(", ")}</p>
            <button class="recommend-btn" onclick="recommendMovie('${movie.title}')">Recommander</button>
        `;
        
        movieContainer.appendChild(card);
    });
}

function applyFilters() {
    const genreFilter = document.getElementById("genreFilter").value;
    const ratingFilter = document.getElementById("ratingFilter").value;
    const sortOption = document.getElementById("sortOption").value;

    let filteredMovies = movies;

    // Filter by genre
    if (genreFilter) {
        filteredMovies = filteredMovies.filter(movie => movie.genre.includes(genreFilter));
    }

    // Filter by rating
    if (ratingFilter) {
        filteredMovies = filteredMovies.filter(movie => movie.rating == ratingFilter);
    }

    // Sort by rating or duration
    if (sortOption) {
        filteredMovies.sort((a, b) => a[sortOption] - b[sortOption]);
    }

    // Display filtered and sorted movies
    displayMovies(filteredMovies);
}

function recommendMovie(selectedTitle) {
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = ""; // Reset movie container

  const selectedMovie = movies.find(movie => movie.title === selectedTitle);
  if (!selectedMovie) {
      alert('Film sélectionné non trouvé.');
      return;
  }

  // 提取所选电影的类型
  const selectedGenres = selectedMovie.genre;

  // 计算每部电影与所选电影共享类型的数量
  const recommendations = movies.filter(movie => movie.title !== selectedTitle)
      .map(movie => {
          return {
              ...movie,
              sharedGenresCount: movie.genre.reduce((count, genre) => {
                  if (selectedGenres.includes(genre)) count++;
                  return count;
              }, 0)
          };
      })
      .sort((a, b) => b.sharedGenresCount - a.sharedGenresCount) // 按共享类型数量降序排序
      .slice(0, 3); // 选择前三部电影

  if (recommendations.length > 0) {
    displayMovies(recommendations);
  } else {
      alert('Aucune recommandation disponible.');
  }
}
