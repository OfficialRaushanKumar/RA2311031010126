# Campus Auth App

A beginner-friendly full stack application with React frontend and Node.js + Express backend.

## Author
- Name: Raushan Kumar
- Roll No: RA2311031010126
- Email: rk9945@srmist.edu.in

## Features
- Register and login pages
- JWT authentication with protected dashboard
- Form validation and inline error messages
- LocalStorage token handling
- Logout functionality
- Loading states and simple styling

## Project Structure
- `backend/` - Express API
- `src/` - React frontend

## Setup

### 1. Install dependencies
From the project root:
```bash
npm install
```

Then install backend dependencies:
```bash
cd backend
npm install
```

### 2. Configure environment variables
Create a `.env` file inside `backend/`:
```env
PORT=5000
JWT_SECRET=your_super_secret_key
```

### 3. Start the backend
```bash
cd backend
npm run dev
```

### 4. Start the frontend
Open a new terminal in the project root and run:
```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and talks to the backend at `http://localhost:5000`.

### 5. Start both at once on Windows
If you want one command to launch both apps, run:
```powershell
./start-dev.ps1
```

## Git commands for GitHub
```bash
git init
git add .
git commit -m "full stack project"
git branch -M main
git remote add origin https://github.com/OfficialRaushanKumar/RA2311031010126.git
git push -u origin main
```
