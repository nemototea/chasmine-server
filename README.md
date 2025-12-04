# chasmine-server

Cha'sMineのWebフロントエンド・バックエンド

## Tech Stack

- **Frontend**: [Remix](https://remix.run/) with TypeScript
- **Backend**: [NestJS](https://nestjs.com/) with TypeScript
- **Container**: Docker & Docker Compose

## Project Structure

```
chasmine-server/
├── frontend/          # Remix frontend application
│   ├── app/          # Remix app directory
│   │   ├── routes/   # Route components
│   │   └── root.tsx  # Root component
│   ├── Dockerfile
│   └── package.json
├── backend/           # NestJS backend application
│   ├── src/          # Source code
│   ├── test/         # Tests
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Docker & Docker Compose

### Development

#### Frontend (Remix)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

#### Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

The backend will be available at http://localhost:3001

### Docker Compose

To run the entire application using Docker Compose:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

To stop the application:

```bash
docker compose down
```

## Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Backend

- `npm run start:dev` - Start development server with watch mode
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

