const gameGrid = document.querySelector('.game-grid');
const loginModal = document.getElementById('loginModal');
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    card.addEventListener('click', (event) => {
        event.preventDefault();
        loginModal.style.display = 'block';
    });
});

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Add click event listener to the "Login" button inside the modal
const loginButton = document.querySelector('button[data-action="login"]');
loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Add click event listener to the "Sign Up" button inside the modal
const signUpButton = document.querySelector('button[data-action="signUp"]');
signUpButton.addEventListener('click', () => {
    window.location.href = 'signUp.html';
});
