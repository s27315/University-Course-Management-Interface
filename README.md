# University Course Management Interface

A professional frontend dashboard for university supervisors to manage the course catalog.

## Features

- 🔐 Supervisor login with JWT authentication
- 📋 View all courses in a responsive card grid
- ➕ Create new courses via modal form
- ✏️ Edit existing course details
- 👁️ View full course details
- 🗑️ Delete courses with confirmation prompt
- 🔍 Search/filter courses by title, code, or instructor
- ✅ Toast notifications for all actions
- ⏳ Loading spinners and error handling

## Tech Stack

- React 18 + Vite
- Plain CSS (no UI library)
- Fetch API for HTTP requests

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
git clone https://github.com/<your-username>/University-Course-Management-Interface.git
cd University-Course-Management-Interface
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Login Credentials

```
Email:    admin@example.com
Password: adminpassword123
```

## API

All requests go to:
```
https://student-management-system-backend.up.railway.app
```

| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | /api/auth/login       | Authenticate user |
| GET    | /api/courses          | Get all courses   |
| GET    | /api/courses/:id      | Get course by ID  |
| POST   | /api/courses          | Create a course   |
| PUT    | /api/courses/:id      | Update a course   |
| DELETE | /api/courses/:id      | Delete a course   |

## Deployment

Deployed on Vercel: [Live Demo](https://your-deployment-url.vercel.app)

## Build for Production

```bash
npm run build
```
