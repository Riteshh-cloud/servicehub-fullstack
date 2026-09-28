# ServiceHub — Full-Stack Service Booking & Management Platform

ServiceHub is a production-style full-stack web application for discovering services, scheduling appointments, managing bookings, and administering a service marketplace.

## Stack

- React + Vite
- React Router
- Axios
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Role-based authorization
- REST API
- Responsive CSS
- Recharts

## Architecture

```text
React Client
    ↓ Axios / REST
Express API
    ↓ Mongoose
MongoDB Atlas / MongoDB
```

## Core modules

### Customer
- Registration and login
- JWT session
- Browse/search/filter services
- Service details
- Date/time booking
- Booking history
- Booking cancellation
- Profile

### Admin
- Admin authentication
- KPI dashboard
- Service CRUD
- User list
- Booking management
- Booking status updates
- Revenue/statistics

## Run locally

### 1. Server

```bash
cd server
npm install
cp .env.example .env
# edit .env
npm run seed
npm run dev
```

Server: `http://localhost:5000`

### 2. Client

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Client: `http://localhost:5173`

## Environment variables

Server:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/servicehub
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Client:

```env
VITE_API_URL=http://localhost:5000/api
```

## Seeded admin

After `npm run seed`:

- Email: `admin@servicehub.dev`
- Password: `Admin@12345`

Change the password before any real deployment.

## Production notes

- Use MongoDB Atlas in production.
- Set a strong random JWT secret.
- Restrict CORS to the deployed frontend.
- Store secrets only in deployment environment variables.
- Add HTTPS through the deployment platform.
- Replace seeded demo credentials before publishing publicly.

## Resume description

**ServiceHub — Full-Stack Service Booking & Management Platform**  
Built a responsive service-booking platform using React.js, Node.js, Express.js and MongoDB with JWT authentication, bcrypt password hashing, role-based authorization, RESTful APIs, service discovery, appointment scheduling, booking lifecycle management and an admin analytics dashboard.

## Suggested GitHub description

A production-style full-stack service booking and management platform built with React, Node.js, Express and MongoDB, featuring JWT authentication, RBAC, service discovery, booking workflows and an admin dashboard.
