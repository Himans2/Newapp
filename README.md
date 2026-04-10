# InsureLearn

InsureLearn is a mobile-first gamified insurance learning platform.

## Tech Stack
- Frontend: React + Tailwind CSS (Vite)
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT

## Folder Structure

```text
Newapp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── dataDummy.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/insurelearn
JWT_SECRET=supersecretkey
```

Seed dummy lessons:

```bash
npm run seed
```

Start backend server:

```bash
npm run dev
```

### 2) Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and backend at `http://localhost:5000`.

### 3) One-command Local Preview

After both backend and frontend dependencies are installed, run:

```bash
./preview.sh
```

This starts both services together:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Stop both with `Ctrl+C`.


## Implemented API Endpoints

- `POST /auth/signup`
- `POST /auth/login`
- `GET /lessons`
- `GET /lessons/:id`
- `POST /quiz/submit` (auth required)
- `GET /user/progress` (auth required)

Admin basics:
- `POST /lessons`
- `PUT /lessons/:id`

## Features Implemented

1. User authentication with JWT
2. User profile progress (points, badges, completed lessons)
3. Structured lessons with categories + examples
4. Quiz submission with immediate pass/fail feedback and scoring
5. Gamification points + badge awarding
6. Dashboard with progress bar and learning stats
7. Mobile-first responsive card UI
8. Backend lesson admin create/edit APIs

## Notes
- This starter uses dummy lesson data via seed script.
- Add role-based auth for admin endpoints in production.


## Troubleshooting
- If `npm install` fails with `403 Forbidden`, your environment/network policy is blocking package registry access. Run the project from a machine/network that allows npm registry downloads.
