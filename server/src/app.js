import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createInvestigation, getInvestigation, getEvidence, submitAnswer, getSolution } from './services/investigationService.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/v1/investigations', rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: true, legacyHeaders: false }));

app.get('/api/v1/health', (_req, res) => res.json({ success: true, data: { status: 'ok', persistence: globalThis.mongoReady ? 'mongodb' : 'memory', generation: process.env.GEMINI_API_KEY ? 'gemini' : 'demo' } }));
app.post('/api/v1/investigations', async (req, res, next) => {
  try {
    const scenario = typeof req.body?.scenario === 'string' ? req.body.scenario.trim() : '';
    const difficulty = req.body?.difficulty || 'medium';
    const max = Number(process.env.MAX_SCENARIO_LENGTH || 1500);
    if (!scenario) return res.status(400).json({ success: false, error: { code: 'INVALID_SCENARIO', message: 'Please describe the mystery first.' } });
    if (scenario.length > max) return res.status(413).json({ success: false, error: { code: 'SCENARIO_TOO_LONG', message: `Keep your scenario under ${max} characters.` } });
    if (!['easy', 'medium', 'hard'].includes(difficulty)) return res.status(400).json({ success: false, error: { code: 'INVALID_DIFFICULTY', message: 'Choose easy, medium, or hard.' } });
    const data = await createInvestigation(scenario, difficulty);
    return res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
});
app.get('/api/v1/investigations/:id', async (req, res, next) => {
  try { const data = await getInvestigation(req.params.id); return data ? res.json({ success: true, data }) : res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Investigation not found.' } }); }
  catch (error) { next(error); }
});
app.get('/api/v1/investigations/:id/evidence/:evidenceId', async (req, res, next) => {
  try { const data = await getEvidence(req.params.id, req.params.evidenceId); return data ? res.json({ success: true, data }) : res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Evidence not found.' } }); }
  catch (error) { next(error); }
});
app.post('/api/v1/investigations/:id/answer', async (req, res, next) => {
  try {
    const selectedSuspectId = req.body?.selectedSuspectId;
    if (typeof selectedSuspectId !== 'string' || !selectedSuspectId) return res.status(400).json({ success: false, error: { code: 'INVALID_ANSWER', message: 'Select a suspect before submitting.' } });
    const result = await submitAnswer(req.params.id, selectedSuspectId);
    if (result.missing) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Investigation not found.' } });
    if (result.conflict) return res.status(409).json({ success: false, error: { code: 'ALREADY_COMPLETED', message: 'This case has already been submitted.' } });
    if (result.invalid) return res.status(400).json({ success: false, error: { code: 'INVALID_SUSPECT', message: 'That suspect is not part of this case.' } });
    return res.json({ success: true, data: result });
  } catch (error) { next(error); }
});
app.get('/api/v1/investigations/:id/solution', async (req, res, next) => {
  try {
    const data = await getSolution(req.params.id);
    if (!data) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Investigation not found.' } });
    if (data.locked) return res.status(409).json({ success: false, error: { code: 'SOLUTION_LOCKED', message: 'Submit an answer before opening the solution.' } });
    return res.json({ success: true, data });
  } catch (error) { next(error); }
});
const clientDist = fileURLToPath(new URL('../../client/dist/', import.meta.url));
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    return res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use((_req, res) => res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Endpoint not found.' } }));

app.use((error, _req, res, _next) => {
  console.error('API error:', error.message);
  const status = error.status || (error.type === 'entity.too.large' ? 413 : 500);
  res.status(status).json({ success: false, error: { code: status === 502 ? 'GENERATION_FAILED' : status === 413 ? 'REQUEST_TOO_LARGE' : 'INTERNAL_ERROR', message: status >= 500 ? (status === 502 ? 'The case could not be generated. Please try again.' : 'Something went wrong. Please try again.') : error.message } });
});

export default app;
