document.addEventListener("DOMContentLoaded", function() {
  loadUser();
  loadMovieDetails();
  setupLogoutButton();
  setupSeatSelection();
  loadUserBookings();
});

function loadUser() {
  const userRole = localStorage.getItem('userRole');
  document.getElementById('userRoleDisplay').textContent = userRole;
}

function loadMovieDetails() {
  const movie = JSON.parse(localStorage.getItem('selectedMovie'));
  if (movie) {
    document.getElementById('movieImage').src = movie.image;
    document.getElementById('movieTitle').textContent = `${movie.title}`;
    document.getElementById('movieDesc').textContent = movie.description;
    document.getElementById('moviePrice').textContent = `Price: ${movie.price}$`;
  }
}

function setupLogoutButton() {
  document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedMovie');
    window.location.href = '/login_page/index.html';
  });
}

function setupSeatSelection() {
  const seats = document.querySelectorAll('.container .seat:not(.sold)');
  const bookSeatsButton = document.getElementById('bookSeats');
  const returnButton = document.getElementById('return');
  const movieId = JSON.parse(localStorage.getItem('selectedMovie')).id;

  seats.forEach(seat => {
    seat.addEventListener('click', () => {
      if (!seat.classList.contains('sold')) {
        seat.classList.toggle('selected');
        updateSelectedCountAndTotal();
      }
    });
  });

  bookSeatsButton.addEventListener('click', () => bookSeats(movieId));
  returnButton.addEventListener('click', () => returnTickets(movieId));
}

function bookSeats(movieId) {
  const selectedSeats = Array.from(document.querySelectorAll('.container .seat.selected'));
  const currentUser = localStorage.getItem('userRole');
  const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
  const movieBookings = bookings[movieId] || {};

  selectedSeats.forEach(seat => {
    seat.classList.add('user-seat', 'sold');
    seat.classList.remove('selected');
    movieBookings[seat.dataset.seatId] = currentUser;
    console.log("Adding user-seat class to:", seat);
console.log("Removing user-seat class from:", seat);
  });

  bookings[movieId] = movieBookings;
  localStorage.setItem('bookings', JSON.stringify(bookings));
  updateSelectedCountAndTotal();
  
}


function returnTickets(movieId) {
  const userSeats = document.querySelectorAll('.container .seat.user-seat');
  const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
  const movieBookings = bookings[movieId] || {};
  const currentUser = localStorage.getItem('userRole');

  userSeats.forEach(seat => {
    const seatId = seat.dataset.seatId;
    if (movieBookings[seatId] === currentUser) {
      seat.classList.remove('user-seat', 'sold');
      delete movieBookings[seatId];
      
    }
    console.log("Adding user-seat class to:", seat);
console.log("Removing user-seat class from:", seat);
  });

  bookings[movieId] = movieBookings;
  localStorage.setItem('bookings', JSON.stringify(bookings));
  updateSelectedCountAndTotal();
}

function loadUserBookings() {
  const movieId = JSON.parse(localStorage.getItem('selectedMovie')).id;
  const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
  const movieBookings = bookings[movieId] || {};
  const currentUser = localStorage.getItem('userRole');

  document.querySelectorAll('.container .seat').forEach(seat => {
    const seatId = seat.dataset.seatId;
    const seatOwner = movieBookings[seatId];
    seat.classList.remove('sold', 'user-seat'); // Clear classes first
    if (seatOwner) {
      seat.classList.add('sold');
      if (seatOwner === currentUser) {
        seat.classList.add('user-seat'); // Differentiate the user's own seats
      }
    }
  });
}

function updateSelectedCountAndTotal() {
  const moviePrice = JSON.parse(localStorage.getItem('selectedMovie')).price;
  const selectedSeats = document.querySelectorAll('.container .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const count = document.getElementById('count');
  const total = document.getElementById('total');

  count.innerText = selectedSeatsCount;
  total.innerText = (selectedSeatsCount * moviePrice).toFixed(2);
}
