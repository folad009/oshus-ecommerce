# Oshus Store

E-commerce platform with a Next.js frontend and NestJS API.

## Tech stack

- **Frontend:** Next.js, Tailwind, Shadcn
- **Backend:** NestJS, Prisma, PostgreSQL, JWT

## Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)

## Quick start

### 1. Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

API runs at [http://localhost:3001/api](http://localhost:3001/api). Health check: `GET /api/health`.

### 3. Frontend

From the project root:

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If a page (e.g. `/account`) returns 404 in dev, stop all dev servers, then run `npm run dev:clean` and wait for the first compile to finish.

`JWT_SECRET` must match in `backend/.env` and `.env.local`.

## Demo accounts

| Portal  | Email                   | Password     |
|---------|-------------------------|--------------|
| Admin   | admin@oshusstore.com    | password123  |
| Vendor  | chioma@glowbeauty.ng    | password123  |
| Support | amara@oshusstore.com    | password123  |

## Architecture

- The UI calls Next.js routes under `/api/*`.
- Those routes proxy to the NestJS backend (`BACKEND_URL`).
- JWTs are stored in httpOnly cookies and verified by the Next.js proxy and NestJS guards.

## Scripts

| Command            | Description              |
|--------------------|--------------------------|
| `npm run dev`      | Start Next.js            |
| `npm run dev:backend` | Start NestJS API      |
| `npm run db:up`    | Start PostgreSQL         |
| `npm run db:migrate` | Run Prisma migrations  |
| `npm run db:seed`  | Seed demo users          |
