📦 Full-Stack Social Feed Application

A complete authentication-based social feed application built with:
React.js (Vite)
TailwindCSS
Firebase Auth (Client)
Express.js
MongoDB
Firebase Admin (Server)

This project converts the provided Login, Register, and Feed HTML pages into a fully functioning web app with secure authentication, post creation, comments, replies, likes, and private/public visibility settings.

🚀 Features
🔐 Authentication

Firebase Authentication (Email/Password)

Protected routes using Firebase Token + Express middleware
Register with:
First Name
Last Name
Email
Password

📰 Feed Page (Protected)

Create posts (text + image)
Public & Private post visibility
See posts from all users (newest first)
Like/Unlike posts
Comment and reply system
Like system on comments/replies
Shows who liked what

🗄 Backend

MongoDB for data storage
Firebase Admin SDK for token verification
Express API for posts, comments, likes, replies, etc.


🛠 Client Installation (React + Vite)
1️⃣ Navigate to client folder
cd client

2️⃣ Install dependencies
npm install

3️⃣ Required env file

Create a .env file inside /client

VITE_apiKey=your_key
VITE_authDomain=your_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_bucket
VITE_messagingSenderId=your_id
VITE_appId=your_id

4️⃣ Run client
npm run dev

🛠 Server Installation (Express + MongoDB)
1️⃣ Navigate to server folder
cd server

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file

MONGODB_URI=your_mongodb_uri
FIREBASE_SERVICE_ACCOUNT=./YourAccountKey.json

4️⃣ Add Firebase Admin credentials

Place YourAccountKey.json in /server folder.

5️⃣ Start server
node index.js

🌐 CORS Configuration

Server allows client URL:

app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));