// const movies = [
//     {
//       "title": "Inception",
//       "year": 2010,
//       "rating": 8.8,
//       "duration": 148,
//       "genre": ["Action", "Adventure", "Sci-Fi"]
//     }
// ];
async function fetchMovies() {
    try {
        const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc';
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        const data = await response.json();
        return data.results;  // 处理和返回电影数据
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
        return [];  // 错误处理，返回空数组
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const movies = await fetchMovies();  // 等待获取电影数据
    console.log(movies);  // 输出电影数据
    // 这里可以调用其他函数处理电影数据
});


// document.addEventListener("DOMContentLoaded", () => {
//     const movies = fetchMovies();
//     console.log(movies); // 测试输出
//     populateFilters(movies);
//     displayMovies(movies);
    
//     // Reset filters button functionality
//     const resetButton = document.getElementById("resetFilters");
//     resetButton.addEventListener("click", () => {
//         // Réinitialiser les filtres et afficher tous les films
//         document.getElementById("genreFilter").value = "";
//         document.getElementById("ratingFilter").value = "";
//         document.getElementById("sortOption").value = "";
//         applyFilters();
//     });
// });

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
