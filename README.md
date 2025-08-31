# 🍳 Smart Recipe Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

>A full-stack web app to generate recipes from ingredient images, powered by AI and cloud storage.

---

## 🚀 Features
- Upload ingredient images and recognize them using Gemini AI
- Generate recipe suggestions with nutrition info
- Favorite, rate, and leave feedback on recipes
- Dietary restrictions and substitution suggestions
- Beautiful, mobile-responsive UI
- 30+ seed recipes included

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **AI Integration:** Gemini API

## 📦 Folder Structure
```
Unthinkable Project/
├── client/        # React frontend
├── server/        # Node.js backend
│   ├── models/    # Mongoose models
│   ├── routes/    # Express routes
│   ├── controllers/ # Business logic
│   └── seed.js    # Seed script for recipes
└── README.md
```

## ⚡ Quick Start
1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd Unthinkable\ Project
   ```
2. **Install dependencies:**
   ```sh
   cd server && npm install
   cd ../client && npm install
   ```
3. **Configure environment variables:**
   - Create `.env` files in both `server` and `client` as needed.
   - Add your MongoDB URL, Cloudinary keys, Gemini API key, etc.
4. **Seed the database:**
   ```sh
   cd server
   node seed.js
   ```
5. **Run the app locally:**
   ```sh
   cd server && node server.js
   cd ../client && npm run dev
   ```
6. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

## 🌍 Deployment
- **Frontend:** Vercel, Netlify, or Render
- **Backend:** Render, Railway, Heroku, or AWS
- **MongoDB:** Use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database
- Update API URLs in frontend to point to your deployed backend

## 📝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

## 📄 License
MIT

---
**Replace all placeholder values in `.env` files with your actual API keys and credentials.**
