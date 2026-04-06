# 📝 Music API – Practice Repository

> ⚠️ **Educational Repository** – This project is built to master Full-stack development, Mongoose relationships, and secure API architecture.

**Music API** is a robust backend service for a music cataloging application. It supports artists, albums, tracks, and personalized user listening history.

---

## 🎯 Project Goals & Practice

- **Mongoose Mastery:** Complex schemas with `ref` relationships and `.populate()` logic.
- **Clean Architecture:** Strict separation between Routes, Controllers, and Services.
- **Advanced Routing:** Implementation of nested resource filtering via Query Params (e.g., `?artist=ID` or `?album=ID`).
- **Security & Auth:** Password hashing with **Argon2** and session-based access via custom `auth` middleware.
- **File Handling:** Image processing and uploads using **Multer**.

## 🛠 Tech Stack

- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT / Argon2
- **Files:** Multer (for Artist/Album covers)

## 📡 API Documentation (Endpoints)

All routes are prefixed with `/api`.

### 👤 Users & Auth
- `POST /users` — Register a new user.
- `POST /users/sessions` — Login and receive a session token.

### 🎸 Artists
- `GET /artists` — Get all artists.
- `GET /artists/:id` — Get detailed info about a specific artist.
- `POST /artists` — Create a new artist (Supports image upload).

### 💿 Albums
- `GET /albums` — Get all albums.
- `GET /albums?artist={ID}` — Get all albums by a specific artist.
- `GET /albums/:album_id` — Get specific album details.
- `POST /albums` — Create an album (Supports image upload, linked to Artist).

### 🎵 Tracks
- `GET /tracks` — Get all tracks.
- `GET /tracks?album={ID}` — Get tracks from a specific album.
- `GET /tracks?artist={ID}` — Get all tracks by a specific artist.
- `POST /tracks` — Create a new track.

### 📜 Track History (Protected)
*Requires `Authorization` header with a valid user token.*
- `GET /track_history` — View personal listening history (Sorted by date DESC).
- `POST /track_history` — Add a track to history (Triggered on play).

## 🏗 Best Practices Implemented

- **Controller Logic:** All controllers are wrapped in `try/catch` with standardized HTTP status codes (`201`, `400`, `404`, `500`).
- **Middleware:** - `auth`: Protects private routes and identifies the user via token.
    - `multer`: Handles `multipart/form-data` for seamless image uploads.
- **Query Structure:** Efficient data fetching using Mongoose queries for dynamic filtering.

## 🚀 Installation & Launch

### 1. Run Backend (API)

```bash
cd backend

npm install

npm run dev
```

### 2. Run Frontend

```bash
cd frontend

npm install

npm run dev
```