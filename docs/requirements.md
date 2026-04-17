# Pinspire — v1 Requirements

This document defines the scope of v1. It's a living document; decisions 
may change, but changes should be deliberate and recorded here.

## Goal

A Pinterest-style photo-sharing web app where users can create accounts, 
upload and tag photos, follow other users, see a feed of photos from 
people they follow, and search for content.

## User stories (v1)

**Accounts**
- As a new user, I can create an account with an email, unique username, 
  and password.
- As a user, I can log in and log out.
- As a user, I can change my username (it must remain unique).

**Profiles**
- As a user, I have a profile page showing my username, follower count, 
  following count, and all photos I've uploaded.
- As a user, I can view other users' profiles.

**Photos**
- As a user, I can upload a photo (PNG or JPEG, max 5MB) with a 
  description and tags.
- As a user, I can delete my own photos.
- Descriptions cannot be edited after upload (v1 constraint).

**Social**
- As a user, I can follow and unfollow other users.
- All accounts are public in v1.

**Feed**
- As a user, I see a feed of photos from people I follow, newest first.
- Feed loads a fixed number of photos at a time with a "Load more" button.
- If I follow no one, my feed shows the most-liked photos overall.

**Engagement**
- As a user, I can like and unlike photos.

**Search**
- As a user, I can search for users by username.
- As a user, I can search for photos by tag.

## Technical constraints

- Passwords must be hashed (never stored in plain text).
- Image uploads limited to PNG and JPEG, max 5MB.
- Photos stored in external file storage (service TBD — e.g. Cloudinary, 
  S3, or similar with a free tier).

## Explicit non-goals for v1

These are deliberately out of scope. Documented here so scope creep 
stays conscious, not accidental.

- Password reset / forgot password flow
- Email verification
- Private accounts
- Blocking users
- Editing photo descriptions after upload
- Infinite scroll (v2 — starting with "Load more")
- Commenting on photos
- Boards / collections
- Direct messages
- Notifications
- Algorithmic feed ranking beyond "newest first"
- Full-text search of descriptions (only tag-based search in v1)

## Open questions

- Image storage provider (decision needed before photo upload work begins)
- Tech stack (decision needed before any implementation)
- Hosting / deployment (decision needed before first deploy)
