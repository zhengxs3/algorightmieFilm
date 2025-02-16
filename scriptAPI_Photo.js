// Tableau pour stocker les films
const movies = [];
const APIkey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWYyYzdmOGFhNTE1MmE2MzUzZGQ4NmU3YWQxOTUyZiIsIm5iZiI6MTczOTY1Mzk2My42MzEsInN1YiI6IjY3YjEwMzRiYmExNDcxMmY3NzM2MzVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVdxqA5PntSr-vVj9piexqli8451flDG54ouvI1-7vc";

// Fonction asynchrone pour récupérer une liste de films
async function fetchMovies() {
    try {
        // Effectuer une requête pour récupérer les films populaires
        const response = await fetch('https://api.themoviedb.org/3/discover/movie', {
            headers: {
                'Authorization': `Bearer ${APIkey}`
            }
        });

        // Vérifier si la requête a réussi
        if (!response.ok) throw new Error('Échec de la récupération des films.');

        // Convertir la réponse en JSON
        const data = await response.json();

        // Pour chaque film récupéré, obtenir plus de détails
        for (const movie of data.results) {
            await fetchMovieDetails(movie.id);
        }

        // Retourner la liste des films
        return movies;
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
        alert('Échec de la récupération des films.');
        return [];
    }
}

// Fonction pour récupérer les détails d’un film à partir de son ID
async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    try {
        // Effectuer une requête pour obtenir les détails du film
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${APIkey}`
            }
        });

        // Vérifier si la requête a réussi
        if (!response.ok) throw new Error(`Erreur HTTP ! Statut : ${response.status}`);

        // Convertir la réponse en JSON
        const movieDetails = await response.json();
        
        // console.log(movieDetails.backdrop_path);

        // Formater les données pour correspondre à la structure souhaitée
        const movieFormatted = {
            img: movieDetails.backdrop_path, //Image du film
            title: movieDetails.title, // Titre du film
            year: movieDetails.release_date ? movieDetails.release_date.split('-')[0] : "Inconnu", // Année de sortie
            rating: movieDetails.vote_average.toFixed(1), // Note moyenne
            duration: movieDetails.runtime || "Inconnu", // Durée du film (en minutes)
            genre: movieDetails.genres.map(genre => genre.name) // Liste des genres
        };

        // Ajouter le film formaté au tableau
        movies.push(movieFormatted);

        return movieFormatted;
    } catch (error) {
        console.error("Impossible de récupérer les détails du film :", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchMovies(); //fonction fetchMovies pour récupérer les films
    console.log(movies);
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
            <img src="https://image.tmdb.org/t/p/w500/${movie.img}" alt="${movie.title}">
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
  