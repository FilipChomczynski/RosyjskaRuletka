document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;

    if (username.trim() === '') {
        document.getElementById('error-message').innerText = 'Wpisz nazwę użytkownika.';
    } else {
        alert('Zalogowano jako: ' + username);
        window.location.href = 'index.html';
    }
});
