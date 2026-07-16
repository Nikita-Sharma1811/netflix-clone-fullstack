const API_BASE = 'http://localhost:3000/api';

// DOM Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginPage = document.getElementById('login-page');
const signupPage = document.getElementById('signup-page');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const logoutBtn = document.getElementById('logout-btn');
const moviesGrid = document.getElementById('movies-grid');
const addMovieForm = document.getElementById('add-movie-form');
const welcomeText = document.getElementById('welcome-text');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const movieMsg = document.getElementById('movie-msg');

// Auth helpers
const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');

const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const showApp = () => {
  authContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  const user = getUser();
  if (user) {
    welcomeText.textContent = `Welcome, ${user.name}`;
  }
  fetchMovies();
};

const showAuth = () => {
  appContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
};

// Page switching
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginPage.classList.remove('active');
  signupPage.classList.add('active');
  loginError.textContent = '';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupPage.classList.remove('active');
  loginPage.classList.add('active');
  signupError.textContent = '';
});

// Signup
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signupError.textContent = '';

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  try {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      signupError.textContent = data.message || 'Signup failed';
      return;
    }

    setAuth(data.token, data.user);
    signupForm.reset();
    showApp();
  } catch (err) {
    signupError.textContent = 'Server error. Is the backend running?';
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.message || 'Login failed';
      return;
    }

    setAuth(data.token, data.user);
    loginForm.reset();
    showApp();
  } catch (err) {
    loginError.textContent = 'Server error. Is the backend running?';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  clearAuth();
  showAuth();
});

// Fetch movies
const fetchMovies = async () => {
  try {
    const res = await fetch(`${API_BASE}/movies`);
    const movies = await res.json();

    if (!res.ok) {
      moviesGrid.innerHTML = '<p>Failed to load movies.</p>';
      return;
    }

    renderMovies(movies);
  } catch (err) {
    moviesGrid.innerHTML = '<p>Cannot connect to server.</p>';
  }
};

const renderMovies = (movies) => {
  if (!movies.length) {
    moviesGrid.innerHTML = '<p>No movies yet. Add one above!</p>';
    return;
  }

  moviesGrid.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'" />
        <div class="movie-info">
          <h4>${movie.title}</h4>
          <p>${movie.description || 'No description available.'}</p>
          <div class="movie-meta">
            <span>${movie.genre}</span>
            <span>★ ${movie.rating}</span>
          </div>
        </div>
      </div>
    `
    )
    .join('');
};

// Add movie
addMovieForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  movieMsg.textContent = '';

  const title = document.getElementById('movie-title').value.trim();
  const genre = document.getElementById('movie-genre').value.trim();
  const image = document.getElementById('movie-image').value.trim();
  const rating = parseFloat(document.getElementById('movie-rating').value) || 0;
  const description = document.getElementById('movie-description').value.trim();

  try {
    const res = await fetch(`${API_BASE}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ title, genre, image, rating, description }),
    });

    const data = await res.json();

    if (!res.ok) {
      movieMsg.textContent = data.message || 'Failed to add movie';
      movieMsg.className = 'error-msg';
      return;
    }

    movieMsg.textContent = 'Movie added successfully!';
    movieMsg.className = 'success-msg';
    addMovieForm.reset();
    fetchMovies();
  } catch (err) {
    movieMsg.textContent = 'Server error.';
    movieMsg.className = 'error-msg';
  }
});

// Init
if (getToken()) {
  showApp();
} else {
  showAuth();
}