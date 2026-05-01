const form = document.getElementById('signup-form');
const messageEl = document.getElementById('message');

//listening for the form
form.addEventListener('submit', async (event) => {
    //prevent defult submittion
    event.preventDefault();

    //reading input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        //sending data to the backend
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.textContent = `Account created. You can now log in.`;
            messageEl.style.color = 'green';
            form.reset();
        } else {
            messageEl.textContent = data.error || 'Something went wrong.';
            messageEl.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
        messageEl.textContent = 'Network error. Is the server running?';
        messageEl.style.color = 'red';
    }
});