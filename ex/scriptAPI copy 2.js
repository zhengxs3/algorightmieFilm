const movies = [
  {
    "title": "Inception",
    "year": 2010,
    "rating": 8.8,
    "duration": 148,
    "genre": ["Action", "Adventure", "Sci-Fi"]
  }
];

async function fetchMovies() {
  try {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie', {
          headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc'
          }
      });
      if (!response.ok) throw new Error('Failed to fetch movies.');
      const data = await response.json();
      console.log(data);
    //   console.log(data.results);
      console.log(data.results[0].id);

      let id_Film = data.results[0].id;
      fetchMovieDetails(id_Film); // 使用实际的movieId来调用

      return data.results; // 确保返回电影数据数组
  } catch (error) {
      console.error("Error fetching data: ", error);
      alert('Failed to fetch movies.');
      return []; // 返回空数组以避免进一步错误
  }
}

async function fetchMovieDetails(movieId) {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc';
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const movieDetails = await response.json();
        console.log(movieDetails);
        console.log(movieDetails.vote_average);
        console.log(movieDetails.title);
        console.log(movieDetails.runtime);
        console.log(movieDetails.genres)
        console.log(movieDetails.release_date);

        let title = movieDetails.title;
        let year = movieDetails.release_date;
        let rating = movieDetails.vote_average;
        let duration = movieDetails.runtime;
        let genre = movieDetails.genres;
        if (movieDetails.genres && movieDetails.genres.length > 0) {
            let genreFilm = movieDetails.genres;
            // 使用正确的 'length' 属性，并且循环条件应该是小于 length，不是小于等于
            for (let i = 0; i < genreFilm.length; i++) {
                // 检查每一个元素确保不会因为未定义而引发错误
                if (genreFilm[i]) {
                    console.log(genreFilm[i].name);
                }
            }
        } else {
            console.log('No genres available or genres data is incomplete.');
        }

        return movieDetails;
    } catch (error) {
        console.error("Could not fetch movie details: ", error);
    }
}




document.addEventListener("DOMContentLoaded", () => {
    const movies = fetchMovies();
    populateFilters(movies);
    displayMovies(movies);
    
    // Reset filters button functionality
    const resetButton = document.getElementById("resetFilters");
    resetButton.addEventListener("click", () => {
        // Réinitialiser les filtres et afficher tous les films
        document.getElementById("genreFilter").value = "";
        document.getElementById("ratingFilter").value = "";
        document.getElementById("sortOption").value = "";
        applyFilters();
    });
});

// function populateFilters() {
//     const genreFilter = document.getElementById("genreFilter");
//     const ratingFilter = document.getElementById("ratingFilter");
//     const genres = new Set();
//     const ratings = new Set();

//     movies.forEach(movie => {
//         movie.genre.forEach(genre => genres.add(genre));
//         ratings.add(movie.rating);
//     });

//     genres.forEach(genre => {
//         const option = document.createElement("option");
//         option.value = genre;
//         option.textContent = genre;
//         genreFilter.appendChild(option);
//     });

//     ratings.forEach(rating => {
//         const option = document.createElement("option");
//         option.value = rating;
//         option.textContent = rating;
//         ratingFilter.appendChild(option);
//     });
// }

// function displayMovies(filteredMovies) {
//     filteredMovies.forEach(movie => {
//         const card = document.createElement("div");
//         card.classList.add("movie-card");

//         card.innerHTML = `
//             <img src="https://place-hold.it/220x300" alt="${movie.title}">
//             <h2>${movie.title} (${movie.year})</h2>
//             <p class="rating">Note: ${movie.rating}</p>
//             <p class="duration">Durée: ${movie.duration} min</p>
//             <p>Genres: ${movie.genre.join(", ")}</p>
//             <button class="recommend-btn" onclick="recommendMovie('${movie.title}')">Recommander</button>
//         `;
        
//         movieContainer.appendChild(card);
//     });
// }

// function applyFilters() {
//     const genreFilter = document.getElementById("genreFilter").value;
//     const ratingFilter = document.getElementById("ratingFilter").value;
//     const sortOption = document.getElementById("sortOption").value;

//     let filteredMovies = movies;

//     // Filter by genre
//     if (genreFilter) {
//         filteredMovies = filteredMovies.filter(movie => movie.genre.includes(genreFilter));
//     }

//     // Filter by rating
//     if (ratingFilter) {
//         filteredMovies = filteredMovies.filter(movie => movie.rating == ratingFilter);
//     }

//     // Sort by rating or duration
//     if (sortOption) {
//         filteredMovies.sort((a, b) => a[sortOption] - b[sortOption]);
//     }

//     // Display filtered and sorted movies
//     displayMovies(filteredMovies);
// }

// function recommendMovie(selectedTitle) {
//   const movieContainer = document.getElementById("movieContainer");
//   movieContainer.innerHTML = ""; // Reset movie container

//   const selectedMovie = movies.find(movie => movie.title === selectedTitle);
//   if (!selectedMovie) {
//       alert('Film sélectionné non trouvé.');
//       return;
//   }

//   // 提取所选电影的类型
//   const selectedGenres = selectedMovie.genre;

//   // 计算每部电影与所选电影共享类型的数量
//   const recommendations = movies.filter(movie => movie.title !== selectedTitle)
//       .map(movie => {
//           return {
//               ...movie,
//               sharedGenresCount: movie.genre.reduce((count, genre) => {
//                   if (selectedGenres.includes(genre)) count++;
//                   return count;
//               }, 0)
//           };
//       })
//       .sort((a, b) => b.sharedGenresCount - a.sharedGenresCount) // 按共享类型数量降序排序
//       .slice(0, 3); // 选择前三部电影

//   if (recommendations.length > 0) {
//     displayMovies(recommendations);
//   } else {
//       alert('Aucune recommandation disponible.');
//   }
// }
