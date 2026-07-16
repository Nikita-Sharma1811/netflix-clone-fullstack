# Netflix Clone – Full Stack Web Application

A Netflix-style movie streaming web app built with **HTML, CSS, JavaScript** (frontend) and **Node.js, Express, MongoDB** (backend).

---

## Features

- User **Signup** and **Login** with JWT authentication
- Token stored in browser `localStorage`
- Fetch and display movies dynamically
- Add new movies from the UI
- Netflix-inspired responsive design
- MongoDB database (viewable in MongoDB Compass)

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML, CSS, JavaScript (no framework)|
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose)                  |
| Auth       | JSON Web Token (JWT)              |

---

## Project Structure
Installation & Setup
Step 1: Start MongoDB
Make sure MongoDB is running on your machine.

Open MongoDB Compass and connect to:

mongodb://127.0.0.1:27017
Database name used by the app: netflixClone

Step 2: Setup Backend
cd backend
npm install
npm run dev
Expected output:

MongoDB Connected: 127.0.0.1
Database: netflixClone
Server running on http://localhost:3000
Important: Run all backend commands from the backend/ folder.
package.json, node_modules, and index.js must all be inside backend/.

Step 3: Setup Frontend
Open a new terminal:

cd frontend
npx serve .
If port 3000 is already used by the backend, use a different port:

npx serve . -l 5500
Open in browser:

http://localhost:3000 (if serve uses 3000 — avoid conflict with backend)
http://localhost:5500 (recommended)
API Endpoints
Method	Endpoint	Description
POST
/api/signup
Register new user
POST
/api/login
Login user (JWT)
GET
/api/movies
Get all movies
POST
/api/movies
Add a new movie
Base URL: http://localhost:3000

Example API Requests
Signup
POST http://localhost:3000/api/signup
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Login
POST http://localhost:3000/api/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "123456"
}
Get Movies
GET http://localhost:3000/api/movies
Add Movie
POST http://localhost:3000/api/movies
Content-Type: application/json
{
  "title": "Stranger Things",
  "description": "Kids face supernatural forces.",
  "genre": "Sci-Fi",
  "image": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
  "rating": 8.7
}
MongoDB Collections
After using the app, check in MongoDB Compass:

Collection	Description
users
Registered users
movies
Movie listings
Scripts (Backend)
Command	Description
npm install
Install dependencies
npm run dev
Start server with nodemon
npm start
Start server (production mode)
Troubleshooting
Error: Cannot find module 'C:\Netflix-Clone\index.js'
Cause: package.json is in the root folder but index.js is inside backend/.

Fix: Move package.json, package-lock.json, and node_modules into the backend/ folder, then run:

cd backend
npm run dev
MongoDB connection failed
Ensure MongoDB service is running
Check .env has correct MONGO_URI
Verify connection in MongoDB Compass
Frontend can't fetch data
Ensure backend is running on port 3000
Serve frontend with npx serve . (don't open index.html directly as a file)
Check browser console for CORS or network errors
Dependencies (Backend)
express – Web framework
mongoose – MongoDB ODM
cors – Cross-origin resource sharing
dotenv – Environment variables
jsonwebtoken – JWT authentication
nodemon – Auto-restart during development
Author
Netflix Clone – Full Stack Project

License
MIT


---
**Quick summary (Hindi):**
| Folder     | Command              |
|------------|----------------------|
| `backend/` | `npm install` → `npm run dev` |
| `frontend/`| `npx serve . -l 5500` |
Switch to **Agent mode** if you want me to create this `README.md
