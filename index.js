const express = require('express');

const requireAuth = require('./middleware/auth');

const app = express();

const db = require('./db');

const bcrypt = require('bcrypt');

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Pininspired');
});

//signup endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters.' });
        }

        // Check if username or email is already taken
        const existing = await db.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'Username or email already in use.' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert into database
        const result = await db.query(
            `INSERT INTO users (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, username, email, created_at`,
            [username, email, passwordHash]
        );

        res.status(201).json({ user: result.rows[0] });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

//testing protected endpoint
app.get('/api/me', requireAuth, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
            [req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});