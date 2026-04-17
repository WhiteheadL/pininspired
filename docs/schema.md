# Database Schema

This document defines the database schema for Pininspired v1. It describes 
every table, the columns each contains, the relationships between them, 
and the constraints applied.

This is a living document - schema changes during v1 development will be 
recorded here with the reasoning behind them.

# Overview

Pininspired uses a relational database (PostgreSQL). The schema is made up 
of six tables: `users`, `photos`, `likes`, `follows`, `tags`, and 
`photo_tags`.

Relationships are represented using foreign keys - a column in one 
table that stores the `id` of a row in another table. 

# Conventions

The following naming and design conventions apply throughout the schema:

Every table has an `id` column as its primary key — an auto-incrementing 
integer that uniquely identifies each row and never changes.
Foreign keys are named `{table}_id`, matching the table they reference 
(e.g. `user_id` references `users.id`).
Timestamp columns use the `created_at` convention.
Table names are plural (`users`, `photos`), column names are singular.
Column names do not repeat the table name (e.g. `name` on the `tags` 
table, not `tag_name`).
Junction tables representing many-to-many relationships are named 
after both sides (e.g. `photo_tags`).

# Tables
# `users`

Stores information intrinsic to each user account.

| Column          | Type       | Notes                                    |
|-----------------|------------|------------------------------------------|
| `id`            | integer    | Primary key, auto-increment              |
| `username`      | text       | Unique, changeable by the user           |
| `email`         | text       | Unique, trusted (no verification in v1)  |
| `password_hash` | text       | Output of bcrypt — never the raw password |
| `created_at`    | timestamp  | When the user signed up                  |

**Notes**

Passwords are never stored in plain text. The `password_hash` column 
holds the output of a one-way hash function (bcrypt), meaning the raw 
password is unrecoverable even to the application. Login works by 
hashing the submitted password and comparing it to the stored hash.

Follower counts, following counts, and uploaded photos are not stored 
on this table — they are derived by querying the `follows` and `photos` 
tables when needed.

# `photos`

Stores uploaded photos. The image files themselves live in external 
storage (Cloudinary); the database stores only the URL and metadata.

| Column        | Type       | Notes                                      |
|---------------|------------|--------------------------------------------|
| `id`          | integer    | Primary key                                |
| `user_id`     | integer    | Foreign key `users.id` (owner)           |
| `image_url`   | text       | Cloudinary URL of the image file           |
| `description` | text       | Written by the uploader, cannot be edited  |
| `created_at`  | timestamp  | When the photo was uploaded                |

# `likes`

Records which users have liked which photos. Each row represents one 
like. Unliking is implemented by deleting the row.

| Column       | Type       | Notes                                    |
|--------------|------------|------------------------------------------|
| `id`         | integer    | Primary key                              |
| `user_id`    | integer    | Foreign key `users.id` (who liked)     |
| `photo_id`   | integer    | Foreign key `photos.id` (what was liked) |
| `created_at` | timestamp  | When the like happened                   |

**Constraint:** `(user_id, photo_id)` must be unique — a user cannot 
like the same photo twice.

# `follows`

Records follow relationships between users. Self-referential - both 
foreign keys point at the `users` table. Unfollowing is implemented by 
deleting the row.

| Column         | Type       | Notes                                      |
|----------------|------------|--------------------------------------------|
| `id`           | integer    | Primary key                                |
| `follower_id`  | integer    | Foreign key `users.id` (doing the following) |
| `followed_id`  | integer    | Foreign key `users.id` (being followed)  |
| `created_at`   | timestamp  | When the follow happened                   |

**Constraint:** `(follower_id, followed_id)` must be unique - a user 
cannot follow the same user twice.

# `tags`

Stores unique tags that can be attached to photos.

| Column | Type    | Notes                      |
|--------|---------|----------------------------|
| `id`   | integer | Primary key                |
| `name` | text    | The tag text, unique       |

**Notes**

Tag names are stored in lowercase and trimmed of whitespace before 
insertion, so that "Sunset", "sunset ", and "SUNSET" resolve to the 
same tag. This is enforced in backend code, not the schema itself.

# `photo_tags`

Junction table linking photos to tags. This represents the many-to-many 
relationship: one photo can have many tags, and one tag can appear on 
many photos. Each row is a single photo-tag pairing.

| Column       | Type       | Notes                                 |
|--------------|------------|---------------------------------------|
| `id`         | integer    | Primary key                           |
| `photo_id`   | integer    | Foreign key `photos.id`             |
| `tag_id`     | integer    | Foreign key `tags.id`               |
| `created_at` | timestamp  | When the tag was attached to the photo |

**Constraint:** `(photo_id, tag_id)` must be unique - the same tag 
cannot be attached to the same photo twice.

# Relationships at a glance

- A **user** has many **photos**.
- A **user** has many **likes**, and a **photo** has many **likes**.
- A **user** can follow many **users**, and be followed by many **users**.
- A **photo** has many **tags** (via `photo_tags`), and a **tag** can 
  appear on many **photos** (via `photo_tags`).

# Derived values

The following are not stored as columns - they are calculated at query 
time from the tables above:

- **Follower count** for a user: `COUNT(*) FROM follows WHERE followed_id = ?`
- **Following count** for a user: `COUNT(*) FROM follows WHERE follower_id = ?`
- **Like count** for a photo: `COUNT(*) FROM likes WHERE photo_id = ?`
- **User's photos**: `SELECT * FROM photos WHERE user_id = ?`
- **User's feed**: photos where `user_id` is in the set of users the 
  viewer follows, ordered by `created_at DESC`.

Storing these as columns would create duplicate sources of truth and 
risk inconsistency. They are cheap to calculate with proper database 
indexes (to be added during implementation).

# Out of scope for v1

The following are deliberately not included in the schema, matching the 
non-goals documented in `requirements.md`:

- Password reset tokens
- Email verification tokens
- Account privacy flags (all accounts are public)
- Blocked users
- Comments
- Boards / collections
- Direct messages
- Notifications