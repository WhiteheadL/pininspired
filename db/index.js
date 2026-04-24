//Load the inviroment in .env
require('dotenv').config();

//Importing the pool class from pg
const { Pool } = require('pg');

//Creating the connection pool veriables
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

//Exporting an object with a quiry
module.exports = {
    query: (text, params) => pool.query(text, params),
};