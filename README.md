## Sazim Monorepo – Docker Setup (Postgres, Backend, Frontend)

This repo contains a NestJS GraphQL backend and a Vite React frontend. The easiest way to run everything is with Docker Compose, which will bring up:
- Postgres database
- Backend API (NestJS + Prisma)
- Frontend (built with Vite, served by Nginx)

### Prerequisites
- Docker and Docker Compose installed
- Optionally: Node.js 22+ and pnpm if you want to run locally

### 1) Configure environment (optional)
Create a `.env` at the repo root (beside `docker-compose.yml`) to override defaults:

```
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=sazim

# Backend
BACKEND_PORT=3000
CORS_ORIGIN=http://localhost:5173

# Frontend
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

If you skip this, sensible defaults will be used.

### 2) Start everything with Docker

```bash
docker compose up -d --build
```

What this does:
- Starts Postgres on port 5432 with a persistent volume
- Builds and starts the backend on port 3000
- Builds the frontend and serves it on port 5173
- Runs `prisma migrate deploy` automatically in the backend container

Open:
- Frontend: http://localhost:5173
- GraphQL API & Playground: http://localhost:3000/graphql

To view logs:
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

To stop:
```bash
docker compose down
```

### Database connection string
The backend uses Prisma and reads `DATABASE_URL` from the environment. In Docker, it is set automatically to connect to the `db` service. Locally, you can use:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sazim
```

### Optional: Run locally without Docker

1. Start Postgres yourself (Docker example):
```bash
docker run --name sazim-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sazim -p 5432:5432 -d postgres:16-alpine
```

2. Backend (NestJS):
```bash
cd backend
cp .env.example .env # or create .env with PORT, CORS_ORIGIN, DATABASE_URL
pnpm install
pnpm prisma migrate deploy
pnpm run start:dev
```
Backend will run on http://localhost:3000

3. Frontend (Vite):
```bash
cd frontend
echo "VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql" > .env
pnpm install
pnpm dev
```
Frontend will run on http://localhost:5173

### Prisma quick commands
- Generate client:
```bash
pnpm prisma generate
```
- Apply migrations (local dev):
```bash
pnpm prisma migrate deploy
```

### Troubleshooting
- Backend cannot connect to DB: ensure Postgres is healthy (`docker compose ps`, `docker compose logs db`).
- CORS blocked: set `CORS_ORIGIN` to a comma-separated list of allowed origins (e.g. `http://localhost:5173,http://127.0.0.1:5173`).
- Frontend cannot reach API: verify `VITE_GRAPHQL_ENDPOINT` points to the backend `/graphql` URL exposed from Docker.

### Project structure
- `backend/`: NestJS GraphQL API and Prisma
- `frontend/`: Vite React app (built and served via Nginx in Docker)
- `docker-compose.yml`: Orchestrates Postgres, backend, and frontend


