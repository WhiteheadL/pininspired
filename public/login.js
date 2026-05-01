const form = document.getElementById('login-form');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            //save token
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);

            //back to home page
            window.location.href = '/';
        } else {
            messageEl.textContent = data.error || 'Login failed.';
            messageEl.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
        messageEl.textContent = 'Network error.';
        messageEl.style.color = 'red';
    }
});