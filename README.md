# AI Mystery Room

An interactive detective game built with React, Express, MongoDB, and Google Gemini. Submit a fictional scenario, inspect the case evidence, choose a suspect, and uncover the stored solution.

## Deploy on Render

This repository includes a Render Blueprint (`render.yaml`) that builds the React client and runs it together with the Express API as one web service.

1. Push this project to a GitHub repository.
2. Create a MongoDB Atlas cluster. Add a database user, allow connections from Render (Atlas Network Access can use `0.0.0.0/0` for Render's changing outbound IPs), and copy the application connection string. Replace its username, password, and database name. Do not commit the connection string.
3. Create a Gemini API key in Google AI Studio if you want AI-generated cases. Without the key, the game uses its built-in demo case generator.
4. In Render, choose **New +**, then **Blueprint**. Connect the GitHub repository and apply the `render.yaml` configuration.
5. When prompted for the two secret environment variables, set `MONGODB_URI` to the Atlas connection string and `GEMINI_API_KEY` to your key. Render keeps these out of source control. `NODE_ENV` is set to production by the Blueprint.
6. Wait for the first deploy to finish, then open the `onrender.com` URL shown on the service page. Check `https://<your-service>.onrender.com/api/v1/health`; a healthy deployment reports `persistence: "mongodb"`.

The Blueprint uses Render's free plan. Free web services can sleep when idle, so the first request after inactivity may take a little longer. Select a paid plan in Render if you need an always-on service. Keep the Gemini and MongoDB credentials in Render's environment settings, and rotate any credentials that were previously committed or shared.

## Run locally

Requirements: Node.js 20+ and npm.

1. Copy `.env.example` to `server/.env` and set `GEMINI_API_KEY` and `MONGODB_URI` for full AI-backed, database-persisted cases. Gemini credentials are only read by the server. For a local demo, these can be omitted.
2. From this directory run `npm install`, `npm --prefix client install`, and `npm --prefix server install`.
3. Run `npm run dev`. The client opens at `http://localhost:5173`; the API runs at `http://localhost:4000`.

If Gemini is not configured, the server creates a deterministic fictional demo case. If MongoDB is unavailable during local development, it uses in-memory persistence; those cases disappear when the server restarts. Production startup requires MongoDB so cases are not silently lost.

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
