# Tasky - MERN Stack Task Manager

![Tasky App](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)

Tasky is a sleek, beautiful task management application built using the MERN stack (MongoDB, Express, React, Node.js). It features a glassmorphism dark-mode UI and falls back to mock data if the backend is offline.

## 🚀 One-Click Deploy

You can deploy your own instance of this app for free!

### Deploy Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNAMANUPADHYAY654%2Fmern-stack-manager%2Ftree%2Fmain%2Ffrontend)

### Deploy Backend (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/NAMANUPADHYAY654/mern-stack-manager)

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/NAMANUPADHYAY654/mern-stack-manager.git
   cd mern-stack-manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env # Add your MongoDB URI here
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## ✨ Features
- Fully responsive modern UI
- RESTful API with Express and Mongoose
- Fallback mock data mode for the frontend
