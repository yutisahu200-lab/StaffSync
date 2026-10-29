# StaffSync — MERN HR Management System

A starter MERN project with a responsive React dashboard and an Express/MongoDB API.

## Features in this starter
- HR / Manager / Employee role selector in the demo UI
- Overview dashboard, employee directory, leave requests, attendance, announcements
- Responsive layout
- Backend API with JWT login/register scaffolding and role-protected routes
- MongoDB models for users and leave requests

> This is a project starter/demo, not a production-ready HR system. The frontend uses sample dashboard data. Connect the forms to the API and add validation/security hardening before real use.

## Requirements
- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection string

## Run the backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Set `MONGO_URI` in `server/.env`. Set a long random `JWT_SECRET`.

## Run the frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Vite prints the local URL, usually http://localhost:5173.

## Demo navigation
The UI works with sample data immediately. Use the role switcher in the sidebar to preview HR, Manager, and Employee views.

## Suggested deployment
- Frontend: Vercel or Netlify (`client`)
- Backend: Render or Railway (`server`)
- Database: MongoDB Atlas
- Configure `VITE_API_URL` in the frontend deployment to your backend URL.
