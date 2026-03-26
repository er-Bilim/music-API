# 📝 Music – Practice Repository

> ⚠️ **This is an educational repository** This code is written solely for practice and to explore technologies

A simple REST API application **Music API**. Each user can register, log in.

The goal is to practice:

- Working with **Mongoose** (schemas, models, methods)
- Proper **architecture** and query structure
- **Password hashing** using `argon2`

**Best practices for controllers:**

- Always wrap in `try/catch`
- Return clear status codes (`200`, `201`, `400`, `404`, `500`)
- Don't write business logic directly in routes

## 🔐 Password Hashing

The `argon2` library is used

## 🚀 Launch

### Backend (API)

Start the server

```bash
npm install

npm run dev
```

### Frontend

```bash
npm install

npm run dev
```