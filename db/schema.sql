--This File contains all the CREATE TABLE statments for the database

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEST NUL,
    create_at TIMESTAMP NOT NULL DEFULT NOW()
);


