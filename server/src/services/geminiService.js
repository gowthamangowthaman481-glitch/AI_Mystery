import { GoogleGenAI } from '@google/genai';

const schemaGuide = `Return one JSON object with: title, caseSummary, suspects (3-5 objects with id,name,role,background,motive,alibi), culpritId, timeline (at least 4 {time,event}), evidence (at least 6 objects each {id,type,category,title,description,content,relatedSuspectIds,source,significance}), solution ({motive,explanation,keyEvidenceIds,sequence}). Evidence type must be message, witness, cctv, physical, or timeline. Message content is {messages:[{sender,time,text}]}; witness/physical content is {text}; cctv content is {observations:[{time,text}]}. All IDs must be unique and references valid. Exactly one culprit. Make a fair, logically solvable fictional mystery whose evidence supports the stored solution; explain red herrings. Do not use markdown.`;

export async function generateWithGemini(scenario, difficulty) {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const result = await client.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    contents: `Create an entirely fictional detective investigation. Difficulty: ${difficulty}. User scenario: ${scenario}\n\n${schemaGuide}`,
    config: { responseMimeType: 'application/json', temperature: 0.7 }
  });
  const raw = result.text;
  return JSON.parse(raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
}
