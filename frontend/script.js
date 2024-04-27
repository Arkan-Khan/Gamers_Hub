// Inside script.js: Ensure you have no syntax errors and variable names match
document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('loginLink'); // Correct variable use

  loginLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'login.html'; 
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const signUpLink = document.getElementById('signUpLink');

  signUpLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'signUp.html';
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const loginLink = document.getElementById('loginLink');
  const signUpLink = document.getElementById('signUpLink');

  loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'login.html';
  });

  signUpLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'signUp.html';
  });
});