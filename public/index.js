const loggedOutView = document.getElementById('logged-out-view');
const loggedInView = document.getElementById('logged-in-view');
const usernameEl = document.getElementById('username');
const logoutBtn = document.getElementById('logout-btn');

async function checkAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
        //not logged in
        loggedOutView.style.display = 'block';
        return;
    }

    //valid token?
    try {
        const response = await fetch('/api/me', {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            usernameEl.textContent = data.user.username;
            loggedInView.style.display = 'block';
        } else {
            //token check
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            loggedOutView.style.display = 'block';
        }
    } catch (err) {
        console.error(err);
        loggedOutView.style.display = 'block';
    }
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
});

checkAuth();