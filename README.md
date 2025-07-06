# 📚  Library Management API with Express, TypeScript & MongoDB

A RESTful API built with **Node.js**, **Express**, **TypeScript**, **Mongoose**, for managing a library system with full book CRUD and borrowing functionality.

---

## 🔧 Features

- 🔹 Create, read, update, delete books
- 🔹 Borrow books with quantity validation
- 🔹 Aggregated borrow summary per book
- 🔹 Filter, sort, and paginate book list
- 🔹 Typed with TypeScript
- 🔹 Modular MVC project structure
- 🔹 Centralized error handling
- 🔹 Environment-based config with `dotenv`

---

## ⚙️ Setup Instructions

1. **Clone & install dependencies:**
   ```bash
   git clone https://github.com/RokibulAlom-hub/level2-assignment3
   cd library-api
   npm install

## .env files
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB

# Dev mode
npm run dev

# Production
npm run build && npm start

