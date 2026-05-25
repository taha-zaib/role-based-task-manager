# Role-Based Task Manager API

A backend REST API built with Node.js, Express, MongoDB, and JWT authentication.  
This project includes authentication, role-based authorization, protected routes, task CRUD operations, and admin controls.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcryptjs

## Authorization
- Protected Routes
- Role-Based Access Control (User/Admin)
- Ownership Validation

## Task System
- Create Tasks
- Get User Tasks
- Update Tasks
- Delete Tasks

## Admin Features
- Promote User to Admin
- Delete Any Task

---

# Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Railway Deployment

---

# Folder Structure

```txt
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

## Navigate Into Project

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRES_IN=7d
```

---

# Run Project

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# API Routes

# Authentication Routes

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Test",
  "email": "test@example.com",
  "password": "12345678"
}
```

---

## Login User

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "test@example.com",
  "password": "12345678"
}
```

---

# Task Routes

## Create Task

```http
POST /api/tasks
```

### Headers

```txt
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "title": "Learn Backend"
}
```

---

## Get My Tasks

```http
GET /api/tasks
```

---

## Update Task

```http
PUT /api/tasks/:id
```

### Request Body

```json
{
  "title": "Updated Task",
  "completed": true
}
```

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# Admin Routes

## Get All Users

```http
GET /api/admin/users
```

---

## Promote User to Admin

```http
PUT /api/admin/promote/:id
```

---

## Delete Any Task

```http
DELETE /api/admin/tasks/:id
```

---

# Authentication Flow

```txt
Login
→ JWT Token Generated
→ Client Stores Token
→ Token Sent In Authorization Header
→ Middleware Verifies Token
→ Protected Route Access Granted
```

---

# Security Features

- Password hashing using bcryptjs
- JWT token verification
- Protected routes
- Role-based authorization
- Ownership validation
- Secure environment variables

---

# Deployment

Backend deployed on Railway.

---

# Future Improvements

- Frontend Integration
- Task Categories
- Due Dates
- Pagination
- Refresh Tokens
- Better Validation
- Global Error Handler

---

# Author

Taha
