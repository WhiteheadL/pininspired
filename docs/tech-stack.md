# Tech Stack

This document records the technologies chosen for Pinspire v1 and the 
reasoning behind each choice. Decisions may be revisited as the project 
evolves — any changes will be recorded here with the reasoning.

## Frontend

**HTML, CSS, and vanilla JavaScript** for v1.

The frontend is what runs in the user's browser. HTML provides the 
structure, CSS handles the styling, and JavaScript adds interactivity. 
Starting with vanilla JavaScript (i.e. no framework) means I'll learn 
how the language actually works before reaching for abstractions that 
hide the details.

**Planned upgrade to React** once the app is functional end-to-end. 
React is the most widely-used frontend framework in the industry, and 
migrating to it after feeling the limits of vanilla JS will make the 
benefits of a framework concrete rather than abstract.

## Backend

**Node.js with Express.**

The backend is a separate program that runs on a server. It handles 
things the browser shouldn't or can't do safely: verifying passwords, 
talking to the database, and enforcing permissions. Node.js lets me 
write the backend in JavaScript — the same language as the frontend — 
which reduces cognitive load while I'm learning full-stack development.

Express is the most popular web framework for Node. It's minimal, 
well-documented, and has a huge ecosystem of tutorials and libraries. 
For a beginner building a standard REST-style backend, it's the 
default choice for good reason.

## Database

**PostgreSQL.**

The database is where the app's data lives permanently — users, photos, 
follows, likes, and tags. Pinspire's data is highly relational: users 
follow other users, photos belong to users, photos have multiple tags, 
and so on. Relational (SQL) databases are designed exactly for this 
kind of data.

PostgreSQL is the industry standard open-source relational database. 
It's free, widely supported by hosting providers, and learning SQL 
with Postgres is a transferable skill that applies to most backend 
jobs.

## Image storage

**Cloudinary** (free tier).

Storing image files directly in a database is a bad practice — it 
bloats the database and makes it slow. Instead, images go to a 
dedicated storage service, and the database stores only the URL 
pointing to each image.

Cloudinary was chosen over alternatives like AWS S3 because it's 
more beginner-friendly: simpler setup, and it handles image resizing 
and optimization automatically, which Pinspire will benefit from when 
displaying feeds of many photos at once. The free tier is generous 
enough for a portfolio project.

## Hosting

**Render** for the backend and database. **Vercel** for the frontend 
(once the frontend is ready to deploy separately).

Hosting is where the app actually lives on the internet so real users 
can reach it. Both services have free tiers suitable for portfolio 
projects and have strong reputations for being beginner-friendly.

Render can host the Node/Express backend and a PostgreSQL database 
together, which simplifies early deployment. Vercel is the standard 
choice for frontend hosting, especially for React apps, so it fits 
the planned upgrade path.

## Tools

- **Git + GitHub** — version control and public repo hosting. Commits 
  from day 1 so progress is visible over time.
- **VS Code** — code editor. Free, widely used, excellent JavaScript 
  support.

## Summary

| Layer           | Choice                        |
|-----------------|-------------------------------|
| Frontend        | HTML / CSS / JavaScript (→ React later) |
| Backend         | Node.js + Express             |
| Database        | PostgreSQL                    |
| Image storage   | Cloudinary                    |
| Backend hosting | Render                        |
| Frontend hosting| Vercel                        |
| Version control | Git + GitHub                  |
| Editor          | VS Code                       |
