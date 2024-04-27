// Get the game grid
const gameGrid = document.querySelector('.game-grid');

// Get the login modal
const loginModal = document.getElementById('loginModal');

// Get the game cards
const gameCards = document.querySelectorAll('.game-card');

// Add click event listener to each game card
gameCards.forEach(card => {
    card.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior of anchor tag
        
        // Show the login modal when a game card is clicked
        loginModal.style.display = 'block';
    });
});

// Close the modal when the close button is clicked
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Prevent the default behavior of the anchor tag within the login modal
const signUpLink = document.getElementById('signUpLink');
signUpLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
});

// Add click event listener to the "Login" button inside the modal
const loginButton = document.querySelector('button[data-action="login"]');
loginButton.addEventListener('click', () => {
    // Redirect to login.html when the "Login" button is clicked
    window.location.href = 'login.html';
});

// Add click event listener to the "Sign Up" button inside the modal
const signUpButton = document.querySelector('button[data-action="signUp"]');
signUpButton.addEventListener('click', () => {
    // Redirect to signUp.html when the "Sign Up" button is clicked
    window.location.href = 'signUp.html';
});
