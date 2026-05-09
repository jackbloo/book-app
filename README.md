# BookApp Fullstack

## Structure

- frontend/
- backend/
- docker-compose.yml

## Run with Docker

**Dont forget to add env.example for backend and env.docker for frontend, please follow the env.example on both backend (env.example) and frontend (env.docker) to work**

```bash
docker compose up --build
```

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

## Run Frontend Manually

```bash
cd frontend
npm install
npm run dev
```

## Run Backend Manually

```bash
cd backend
npm install
npm run dev
```

## Run Tests

### Frontend Tests

```bash
cd frontend
npm install
npm test
```

### Backend Tests

```bash
cd backend
npm install
npm test
```

### Run All Tests

```bash
cd frontend && npm test & cd ../backend && npm test
```

## Screenshots

### Mobile
<img src="./assets/mobile-1.png" alt="Mobile View 1" width="300">
<img src="./assets/mobile-2.png" alt="Mobile View 2" width="300">

### Desktop
<img src="./assets/desktop-1.png" alt="Desktop View 1" width="500">
<img src="./assets/desktop-2.png" alt="Desktop View 2" width="500">

