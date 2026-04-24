const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Pininspired');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

//Testing the database connection
const db = require('./db');

db.query('SELECT NOW()', [])
.then(result => {
    console.log('Database connected. Current time from DB:', result.rows[0].now);
})
.catch(err => {
    console.log('Database connection failed:', err.message);
})