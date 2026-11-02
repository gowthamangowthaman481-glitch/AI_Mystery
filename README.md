# AI Mystery Room

An interactive detective game built with React, Express, MongoDB, and Google Gemini. Submit a fictional scenario, inspect the case evidence, choose a suspect, and uncover the stored solution.

## Run locally

Requirements: Node.js 20+ and npm.

1. Copy `.env.example` to `server/.env` and set `GEMINI_API_KEY` and `MONGODB_URI` for full AI-backed, database-persisted cases. Gemini credentials are only read by the server.
2. From this directory run `npm install`, `npm --prefix client install`, and `npm --prefix server install`.
3. Run `npm run dev`. The client opens at `http://localhost:5173`; the API runs at `http://localhost:4000`.

If Gemini is not configured, the server creates a deterministic fictional demo case. If MongoDB is unavailable, it uses in-memory persistence. These fallbacks work independently; in-memory cases disappear when the server restarts. Never use in-memory persistence in production.

## API

- `GET /api/v1/health`
- `POST /api/v1/investigations` with `{ "scenario": "...", "difficulty": "medium" }`
- `GET /api/v1/investigations/:id`
- `GET /api/v1/investigations/:id/evidence/:evidenceId`
- `POST /api/v1/investigations/:id/answer` with `{ "selectedSuspectId": "..." }`
- `GET /api/v1/investigations/:id/solution` (completed investigations only)

The case response never includes culprit or solution fields before completion. Each investigation accepts one final answer.

## Architecture

`client/` is a Vite React application. `server/` contains Express routes, validation, the Gemini generation service, Mongoose persistence, and a memory repository used when MongoDB is not configured. Gemini produces the full case in one structured JSON generation; the server validates all entity references and required content before persistence. Evidence remains text-first and playable without generated media.
