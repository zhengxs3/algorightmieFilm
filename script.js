const movies = [
    {
      "title": "Inception",
      "year": 2010,
      "rating": 8.8,
      "duration": 148,
      "genre": ["Action", "Adventure", "Sci-Fi"]
    },
    {
      "title": "The Dark Knight",
      "year": 2008,
      "rating": 9.0,
      "duration": 152,
      "genre": ["Action", "Crime", "Drama"]
    },
    {
      "title": "Interstellar",
      "year": 2014,
      "rating": 8.6,
      "duration": 169,
      "genre": ["Adventure", "Drama", "Sci-Fi"]
    },
    {
      "title": "Parasite",
      "year": 2019,
      "rating": 8.6,
      "duration": 132,
      "genre": ["Comedy", "Drama", "Thriller"]
    },
    {
      "title": "The Godfather",
      "year": 1972,
      "rating": 9.2,
      "duration": 175,
      "genre": ["Crime", "Drama"]
    },
    {
      "title": "Pulp Fiction",
      "year": 1994,
      "rating": 8.9,
      "duration": 154,
      "genre": ["Crime", "Drama"]
    },
    {
      "title": "Forrest Gump",
      "year": 1994,
      "rating": 8.8,
      "duration": 142,
      "genre": ["Drama", "Romance"]
    },
    {
      "title": "The Matrix",
      "year": 1999,
      "rating": 8.7,
      "duration": 136,
      "genre": ["Action", "Sci-Fi"]
    },
    {
      "title": "Avengers: Endgame",
      "year": 2019,
      "rating": 8.4,
      "duration": 181,
      "genre": ["Action", "Adventure", "Drama"]
    },
    {
      "title": "The Shawshank Redemption",
      "year": 1994,
      "rating": 9.3,
      "duration": 142,
      "genre": ["Drama"]
    },
    {
      "title": "Gladiator",
      "year": 2000,
      "rating": 8.5,
      "duration": 155,
      "genre": ["Action", "Adventure", "Drama"]
    },
    {
      "title": "Titanic",
      "year": 1997,
      "rating": 7.8,
      "duration": 195,
      "genre": ["Drama", "Romance"]
    },
    {
      "title": "The Lion King",
      "year": 1994,
      "rating": 8.5,
      "duration": 88,
      "genre": ["Animation", "Adventure", "Drama"]
    },
    {
      "title": "Saving Private Ryan",
      "year": 1998,
      "rating": 8.6,
      "duration": 169,
      "genre": ["Drama", "War"]
    },
    {
      "title": "The Green Mile",
      "year": 1999,
      "rating": 8.6,
      "duration": 189,
      "genre": ["Crime", "Drama", "Fantasy"]
    },
    {
      "title": "Schindler's List",
      "year": 1993,
      "rating": 9.0,
      "duration": 195,
      "genre": ["Biography", "Drama", "History"]
    },
    {
      "title": "The Departed",
      "year": 2006,
      "rating": 8.5,
      "duration": 151,
      "genre": ["Crime", "Drama", "Thriller"]
    },
    {
      "title": "Whiplash",
      "year": 2014,
      "rating": 8.5,
      "duration": 106,
      "genre": ["Drama", "Music"]
    },
    {
      "title": "The Prestige",
      "year": 2006,
      "rating": 8.5,
      "duration": 130,
      "genre": ["Drama", "Mystery", "Sci-Fi"]
    },
    {
      "title": "Django Unchained",
      "year": 2012,
      "rating": 8.4,
      "duration": 165,
      "genre": ["Drama", "Western"]
    },
    {
      "title": "The Wolf of Wall Street",
      "year": 2013,
      "rating": 8.2,
      "duration": 180,
      "genre": ["Biography", "Comedy", "Crime"]
    },
    {
      "title": "Blade Runner 2049",
      "year": 2017,
      "rating": 8.0,
      "duration": 164,
      "genre": ["Action", "Drama", "Sci-Fi"]
    },
    {
      "title": "Joker",
      "year": 2019,
      "rating": 8.4,
      "duration": 122,
      "genre": ["Crime", "Drama", "Thriller"]
    },
    {
      "title": "Logan",
      "year": 2017,
      "rating": 8.1,
      "duration": 137,
      "genre": ["Action", "Drama", "Sci-Fi"]
    },
    {
      "title": "Spider-Man: Into the Spider-Verse",
      "year": 2018,
      "rating": 8.4,
      "duration": 117,
      "genre": ["Animation", "Action", "Adventure"]
    },
    {
      "title": "Mad Max: Fury Road",
      "year": 2015,
      "rating": 8.1,
      "duration": 120,
      "genre": ["Action", "Adventure", "Sci-Fi"]
    },
    {
      "title": "A Beautiful Mind",
      "year": 2001,
      "rating": 8.2,
      "duration": 135,
      "genre": ["Biography", "Drama"]
    },
    {
      "title": "La La Land",
      "year": 2016,
      "rating": 8.0,
      "duration": 128,
      "genre": ["Comedy", "Drama", "Music"]
    },
    {
      "title": "The Grand Budapest Hotel",
      "year": 2014,
      "rating": 8.1,
      "duration": 99,
      "genre": ["Adventure", "Comedy", "Crime"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    populateFilters();
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
  movieContainer.innerHTML = ""; // Réinitialise le conteneur de films

  // Trouver le film sélectionné par son titre
  const selectedMovie = movies.find(movie => movie.title === selectedTitle);
  if (!selectedMovie) {
      alert('Film sélectionné non trouvé.');
      return;
  }

  // Extraire les genres du film sélectionné
  const selectedGenres = selectedMovie.genre;

  // Calculer le nombre de genres partagés avec chaque film
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
      .sort((a, b) => b.sharedGenresCount - a.sharedGenresCount) // Trier par le nombre de genres partagés, en ordre décroissant
      .slice(0, 3); // Sélectionner les trois films les plus recommandés

  // Afficher les films recommandés s'il y en a, sinon afficher une alerte
  if (recommendations.length > 0) {
    displayMovies(recommendations);
  } else {
      alert('Aucune recommandation disponible.');
  }
}
