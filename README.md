# 📝 Music API – Practice Repository

> ⚠️ **Educational Repository** – This project is built to master Full-stack development, Mongoose relationships, and secure API architecture.

**Music API** is a robust backend service for a music cataloging application. It supports artists, albums, tracks, and personalized user listening history with a focus on modern security and developer experience.

---

## 🎯 Key Features & Implementation

- **Mongoose Mastery:** Complex schemas with `ref` relationships and efficient `.populate()` logic.
- **Secure Authentication:** Implementation of **HTTP-only Cookies** for session management, significantly reducing XSS attack surfaces compared to LocalStorage.
- **Social Auth Integration:** Support for **Google OAuth 2.0** and secondary providers (GitHub/LinkedIn), allowing seamless user onboarding.
- **Rich User Profiles:** Support for custom `displayNames` and `avatars` (via Multer uploads or social profile sync).
- **Clean Architecture:** Strict separation between Routes, Controllers, and Services with global error handling.

## 🛠 Tech Stack

- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** Argon2, **HTTP-only Cookies**, Passport.js (OAuth 2.0)
- **Files:** Multer (for Artist/Album covers and User avatars)
- **Infrastructure:** ESLint, Prettier, **Husky** (Git Hooks)

## 📡 API Documentation

All routes are prefixed with `/api`.

### 👤 Users & Auth
- `POST /users` — Register a new user (Requires `email`, `password`, `displayName`, and optional `avatar`).
- `POST /users/sessions` — Standard login. Sets a secure **HTTP-only Cookie**.
- `DELETE /users/sessions` — Logout. Clears the session cookie.
- `GET /users/google` — Initiation of Google OAuth flow.
- `GET /users/github` — Initiation of GitHub OAuth flow.

### 🎸 Artists
- `GET /artists` — Fetch all artists.
- `POST /artists` — Create an artist (Supports image upload).

### 💿 Albums
- `GET /albums?artist={ID}` — Fetch albums filtered by artist.
- `POST /albums` — Create an album (Linked to Artist, supports cover upload).

### 🎵 Tracks
- `GET /tracks?album={ID}` — Fetch tracks from a specific album.
- `POST /tracks` — Add a new track.

### 📜 Track History (Protected)
*Access requires a valid session cookie.*
- `GET /track_history` — View personal listening history (Sorted by date DESC).
- `POST /track_history` — Log a track play event.

---

## 🛠 Developer Experience & Quality Control

To ensure high code standards, this project utilizes:
- **Linting & Formatting:** ESLint and Prettier are configured for both Frontend and Backend.
- **Automated Checks:** **Husky** pre-commit hooks are active.
- **Validation:** Every commit automatically triggers

---

## 🚀 Installation & Launch

### 1. Environment Configuration
Create a `.env` file in the `backend` directory:

```env

```

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