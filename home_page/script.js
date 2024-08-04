document.addEventListener("DOMContentLoaded", function() {
    updateRoleDisplay();
    displayMovies(); 
    setupLogoutButton();
    updateButtonVisibility();
});

function updateRoleDisplay() {
    const userRoleDisplay = document.getElementById('userRoleDisplay');
    const userRole = localStorage.getItem('userRole');
    
    if (userRoleDisplay && userRole) {
        userRoleDisplay.textContent = userRole === "admin" ? "Admin" : userRole;  // Display "Admin" or the actual user role
    }
}

function setupLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener("click", function() {
            logout();
        });
    }

}
function updateButtonVisibility() {
    const adminButtons = document.querySelectorAll('.admin-btn');
    const userButtons = document.querySelectorAll('.user-btn');
    const addMovieButton = document.querySelector('.add-movie-button');
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'admin') {
        adminButtons.forEach(btn => btn.style.display = 'inline-block');
        userButtons.forEach(btn => btn.style.display = 'none');
        if (addMovieButton) addMovieButton.style.display = 'flex';
    } else {
        adminButtons.forEach(btn => btn.style.display = 'none');
        userButtons.forEach(btn => btn.style.display = 'inline-block');
        if (addMovieButton) addMovieButton.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('userRole');
    // localStorage.removeItem('userRole');
    window.location.href = '/login_page/index.html';
}

function toggleModal() {
    var modal = document.getElementById('addMovieModal');
    modal.classList.toggle('active');
}



let nextMovieId = 1;
const movies = [
    {
        id: nextMovieId++,
        image: "/img/Deadpool3.png",
        title: "Deadpool & Wolverine (2024)",
        description: "Marvel Studios 'Deadpool & Wolverine' delivers the ultimate team-up throwdown on July 26.",
        price: 120
    },
    {
        id: nextMovieId++,
        image: "/img/DespicableMe4.png",
        title: "Despicable Me 4 (2024)",
        description: "In the first Despicable Me movie in seven years, Gru, the world’s favorite supervillain-turned-Anti-Villain League-agent.",
        price: 150
    },
    {
        id: nextMovieId++,
        image: "/img/DunePartTwo.png",
        title: "Dune: Part Two (2024)",
        description: "“Dune: Part Two” will explore the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
        price: 130
    },
    {
        id: nextMovieId++,
        image: "/img/GhostbustersFrozenEmpire.png",
        title: "Ghostbusters: Frozen Empire (2024)",
        description: "In Ghostbusters: Frozen Empire, the Spengler family returns to where it all started",
        price: 135
    },
    {
        id: nextMovieId++,
        image: "/img/VenomTheLastDance.png",
        title: "Venom: The Last Dance (2024)",
        description: "In Venom: The Last Dance, Tom Hardy returns as Venom, one of Marvel’s greatest and most complex characters",
        price: 160
    }
    // Add more movies as needed
];
// function initializeMovies() {
//     if (!localStorage.getItem('movies')) {
//         localStorage.setItem('movies', JSON.stringify(movies));
//     }
// };
// initializeMovies();
function displayMovies() {
    const movieContainer = document.querySelector('.cards');
    movieContainer.innerHTML = ''; // Clear existing content

    movies.forEach((movie, index) => {
        const movieCard = `
            <div class="card">
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <button class="user-btn" onclick="bookMovie(${movie.id})">Book Ticket</button>
                <button class="admin-btn" data-id="${movie.id}">Delete</button>
            </div>
        `;
        movieContainer.innerHTML += movieCard;
    });
    attachDeleteHandlers();
    updateButtonVisibility();
}


function sanitizeFilename(title, originalFilename) {
    // Extract the file extension
    const extension = originalFilename.slice(originalFilename.lastIndexOf('.'));
    // Remove non-alphanumeric characters and replace spaces
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/gi, '');
    return sanitizedTitle + extension;
}

document.addEventListener("DOMContentLoaded", function() {
    const addMovieForm = document.getElementById('addMovieForm');
    addMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const movieTitle = document.getElementById('movieTitle').value;
        const movieDescription = document.getElementById('movieDescription').value;
        const movieImageInput = document.getElementById('movieImage');
        const moviePriceInput = document.getElementById('moviePrice');
        const newId = movies.length + 1;

        // Sanitize the filename using the title and original filename
        const filename = sanitizeFilename(movieTitle, movieImageInput.value);

        const newMovie = {
            id: newId,
            image: `/img/${filename}`,  // Use the sanitized filename
            title: movieTitle,
            description: movieDescription,
            price: parseInt(moviePriceInput.value)
        };

        movies.push(newMovie);  // Add new movie to the array
        displayMovies();  // Update the display
        toggleModal();  // Close the modal
        addMovieForm.reset();  // Reset the form for the next input
    });
});

function attachDeleteHandlers() {
    document.querySelectorAll('.admin-btn').forEach(button => {
        button.onclick = function() {
            const movieId = parseInt(this.getAttribute('data-id'));
            deleteMovie(movieId);
        };
    });
}

function deleteMovie(movieId) {
    const index = movies.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
        movies.splice(index, 1); // Remove the movie from the array
        displayMovies(); // Refresh the display
    }
}

function bookMovie(movieId) {
    const selectedMovie = movies.find(movie => movie.id === movieId);
    localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
    window.location.href = '/booking_page/index.html'; // Redirect to booking page
}

