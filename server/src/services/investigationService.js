import { randomUUID } from 'node:crypto';
import Investigation from '../models/Investigation.js';
import { generateWithGemini } from './geminiService.js';
import { createDemoCase } from './demoCase.js';

const memory = new Map();

function validateCase(item) {
  const errors = [];
  if (!item || typeof item !== 'object') throw new Error('AI returned an invalid case.');
  for (const key of ['title', 'caseSummary', 'culpritId']) if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`Missing ${key}`);
  if (!Array.isArray(item.suspects) || item.suspects.length < 3) errors.push('At least three suspects are required');
  if (!Array.isArray(item.evidence) || item.evidence.length < 6) errors.push('At least six evidence items are required');
  if (!Array.isArray(item.timeline) || item.timeline.length < 3) errors.push('A useful timeline is required');
  if (!item.solution?.motive || !item.solution?.explanation) errors.push('A complete solution is required');
  const suspectIds = new Set((item.suspects || []).map(s => s.id));
  const evidenceIds = new Set((item.evidence || []).map(e => e.id));
  if (!suspectIds.has(item.culpritId)) errors.push('Culprit must refer to a suspect');
  if (suspectIds.size !== (item.suspects || []).length) errors.push('Suspect IDs must be unique');
  for (const suspect of item.suspects || []) {
    for (const key of ['id', 'name', 'role', 'background', 'motive', 'alibi']) {
      if (typeof suspect[key] !== 'string' || !suspect[key].trim()) errors.push(`Suspect is missing ${key}`);
    }
  }
  for (const entry of item.timeline || []) {
    if (typeof entry.time !== 'string' || !entry.time.trim() || typeof entry.event !== 'string' || !entry.event.trim()) errors.push('Timeline entries need a time and event');
  }
  if (evidenceIds.size !== (item.evidence || []).length) errors.push('Evidence IDs must be unique');
  for (const evidence of item.evidence || []) {
    if (!['message', 'witness', 'cctv', 'physical', 'timeline'].includes(evidence.type)) errors.push('Evidence has an unsupported type');
    if (!evidence.id || !evidence.title || !evidence.description || !evidence.content || !evidence.source || !evidence.significance) errors.push('Evidence is missing required fields');
    if ((evidence.relatedSuspectIds || []).some(id => !suspectIds.has(id))) errors.push('Evidence references an unknown suspect');
  }
  if (!Array.isArray(item.solution?.keyEvidenceIds) || item.solution.keyEvidenceIds.length < 1) errors.push('Solution needs at least one key evidence reference');
  if ((item.solution?.keyEvidenceIds || []).some(id => !evidenceIds.has(id))) errors.push('Solution references unknown evidence');
  if (errors.length) throw new Error(`Generated case failed validation: ${[...new Set(errors)].join('; ')}`);
  return item;
}

function publicEvidence(e) {
  const { significance, ...visible } = e;
  return visible;
}
function publicCase(doc) {
  const value = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(value._id || value.id), title: value.title, scenario: value.scenario,
    difficulty: value.difficulty, caseSummary: value.caseSummary, suspects: value.suspects,
    timeline: value.timeline, evidence: value.evidence.map(publicEvidence),
    status: value.status, createdAt: value.createdAt
  };
}
function find(id) { return Investigation.findById(id); }

export async function createInvestigation(scenario, difficulty) {
  let generated;
  if (process.env.GEMINI_API_KEY) {
    let lastError;
    for (let attempt = 0; attempt < 2; attempt++) {
      try { generated = validateCase(await generateWithGemini(scenario, difficulty)); break; }
      catch (error) { lastError = error; }
    }
    if (!generated) { const e = new Error(lastError?.message || 'The case generator returned an invalid result.'); e.status = 502; throw e; }
  } else generated = createDemoCase(scenario, difficulty);
  const payload = { ...generated, scenario, difficulty, status: 'active' };
  if (globalThis.mongoReady) {
    const doc = await Investigation.create(payload);
    return { id: String(doc._id), title: doc.title, status: doc.status, mode: process.env.GEMINI_API_KEY ? 'ai' : 'demo' };
  }
  const id = randomUUID(); memory.set(id, { ...payload, _id: id, createdAt: new Date(), updatedAt: new Date() });
  return { id, title: payload.title, status: payload.status, mode: 'demo' };
}

export async function getInvestigation(id) {
  const doc = globalThis.mongoReady ? await find(id) : memory.get(id);
  if (!doc) return null;
  return publicCase(doc);
}
export async function getEvidence(id, evidenceId) {
  const doc = globalThis.mongoReady ? await find(id) : memory.get(id);
  if (!doc) return null;
  const value = doc.toObject ? doc.toObject() : doc;
  const evidence = value.evidence.find(item => item.id === evidenceId);
  return evidence ? publicEvidence(evidence) : null;
}
export async function submitAnswer(id, selectedSuspectId) {
  const doc = globalThis.mongoReady ? await find(id) : memory.get(id);
  if (!doc) return { missing: true };
  const value = doc.toObject ? doc.toObject() : doc;
  if (value.status === 'completed') return { conflict: true };
  if (!value.suspects.some(s => s.id === selectedSuspectId)) return { invalid: true };
  const isCorrect = selectedSuspectId === value.culpritId;
  if (globalThis.mongoReady) {
    doc.status = 'completed'; doc.selectedSuspectId = selectedSuspectId; doc.isCorrect = isCorrect; doc.completedAt = new Date(); await doc.save();
  } else Object.assign(doc, { status: 'completed', selectedSuspectId, isCorrect, completedAt: new Date() });
  return { isCorrect, status: 'completed', selectedSuspect: value.suspects.find(s => s.id === selectedSuspectId), solution: { culpritId: value.culpritId, culprit: value.suspects.find(s => s.id === value.culpritId), ...value.solution, evidence: value.evidence.map(e => ({ ...publicEvidence(e), significance: e.significance })) } };
}
export async function getSolution(id) {
  const doc = globalThis.mongoReady ? await find(id) : memory.get(id);
  if (!doc) return null;
  const value = doc.toObject ? doc.toObject() : doc;
  if (value.status !== 'completed') return { locked: true };
  return { culpritId: value.culpritId, culprit: value.suspects.find(s => s.id === value.culpritId), selectedSuspectId: value.selectedSuspectId, isCorrect: value.isCorrect, ...value.solution, evidence: value.evidence.map(e => ({ ...publicEvidence(e), significance: e.significance })) };
}
