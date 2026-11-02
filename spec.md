I'll turn your project idea into a **Spec-Driven Development (SDD) Specification Sheet** that serves as the single source of truth for development. It will define what AI Mystery Room should do, how the MERN stack and Gemini AI fit together, how the investigation works, and how to verify that every feature is implemented correctly.

The key design principle is that **every mystery must have a consistent, predetermined culprit and a coherent set of AI-generated clues**. The AI shouldn't generate unrelated evidence or change the culprit halfway through an investigation.

# SPECIFICATION SHEET: AI MYSTERY ROOM
**Document Status:** Draft for Implementation  
**Version:** 1.0  
**Project Type:** AI-Powered Web Application  
**Development Methodology:** Spec-Driven Development (SDD)  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Engine:** Google Gemini API  
**Primary Language:** JavaScript  
**Specification Role:** Single Source of Truth (SSOT)

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery investigation platform where users can create and solve fictional investigation challenges based on short stories or scenarios they provide.

The user submits a small scenario, such as a suspicious theft, a mysterious disappearance, a betrayal, or an unexplained incident.

The backend uses Google Gemini AI to transform the scenario into a complete fictional investigation. The investigation contains a hidden culprit, a timeline of events, multiple suspects, and a collection of AI-generated or AI-assisted evidence.

Users investigate the case by reviewing evidence such as fictional WhatsApp-style conversations, photographs, CCTV-style footage, witness statements, and other clues.

After reviewing the evidence, users select the person they believe is responsible for the incident.

The application evaluates the user's answer against the original case solution and presents the final explanation, including the culprit's identity, the motive, and how the evidence supports the conclusion.

**The main objective is to create an immersive, interactive detective experience powered by generative AI.**

## 1.2 Problem Statement

Traditional mystery games offer predefined cases and limited replayability. Users cannot easily create investigations from their own story ideas.

AI Mystery Room addresses this limitation by allowing users to submit their own scenarios and receive dynamically generated fictional investigations.

The system combines generative AI, evidence exploration, logical reasoning, and interactive decision-making to create a personalized mystery-solving experience.

## 1.3 Project Objectives

1. Allow users to create investigations from short text scenarios.
2. Generate coherent fictional mysteries using Gemini AI.
3. Create multiple suspects with distinct identities, backgrounds, and motives.
4. Generate fictional evidence that supports or contradicts different suspects.
5. Present evidence through an interactive investigation interface.
6. Allow users to identify the culprit using the available evidence.
7. Evaluate the user's answer and explain the correct solution.
8. Support multiple investigations with different scenarios.
9. Maintain consistency between the culprit, timeline, suspects, and evidence.
10. Provide an engaging, responsive, and user-friendly experience.

---

# 2. PROJECT SCOPE

## 2.1 Core Features

The first version of AI Mystery Room must include the following features.

| Feature ID | Feature | Description | Priority |
|---|---|---|---|
| FR-001 | Scenario Submission | Users submit a short story or incident description. | Must Have |
| FR-002 | Investigation Generation | Gemini generates a structured fictional mystery. | Must Have |
| FR-003 | Suspect Creation | The system creates multiple suspects with motives and backgrounds. | Must Have |
| FR-004 | Evidence Generation | The system creates evidence associated with the investigation. | Must Have |
| FR-005 | Evidence Room | Users explore evidence through an interactive interface. | Must Have |
| FR-006 | Culprit Selection | Users select the suspect they believe is responsible. | Must Have |
| FR-007 | Answer Evaluation | The backend checks the selected suspect against the stored solution. | Must Have |
| FR-008 | Solution Reveal | The application explains the culprit, motive, and supporting evidence. | Must Have |
| FR-009 | Investigation Persistence | Investigation data is saved in MongoDB. | Must Have |
| FR-010 | Responsive Interface | The application supports desktop and mobile screens. | Must Have |
| FR-011 | Investigation History | Users can revisit saved investigations. | Should Have |
| FR-012 | Difficulty Selection | Users can select Easy, Medium, or Hard difficulty. | Should Have |
| FR-013 | Investigation Timer | Users can optionally solve a case within a time limit. | Could Have |
| FR-014 | Scoring System | The application awards points for solving cases. | Should Have |

Priorities describe the intended implementation order, not a commitment that every feature will be available in the initial release.

## 2.2 Initial Release Scope

The minimum viable product (MVP) must support this complete workflow:

**Scenario Submission → AI Investigation Generation → Evidence Exploration → Culprit Selection → Answer Evaluation → Solution Reveal**

The MVP must be usable even if advanced AI-generated video or image assets are unavailable. Evidence should still be presented through supported formats such as text, structured chat transcripts, timelines, and images.

Advanced media generation can be added through separate integrations.

## 2.3 Out of Scope for the Initial Release

The following are not required for the MVP:

- Real-world criminal investigations.
- Access to actual WhatsApp accounts or private messages.
- Real surveillance camera integrations.
- Live video surveillance.
- AI voice calling between suspects.
- Multiplayer investigations.
- User-generated public case sharing.
- A complex subscription or payment system.
- Advanced 3D crime-scene simulations.

All investigations and their evidence must be fictional.

---

# 3. USER ROLES

## 3.1 Guest User

A guest user can:

- Open the website.
- Enter a scenario.
- Generate an investigation.
- Review suspects and evidence.
- Submit a culprit selection.
- View the solution.

Guest investigation persistence may use a session or a generated investigation identifier.

## 3.2 Registered User

If authentication is implemented, a registered user can:

- Perform all guest actions.
- Save investigations to their account.
- Revisit previous investigations.
- View completed cases.
- Track scores and solved cases.

**MVP decision:** Authentication is optional. The core mystery-solving workflow must not depend on account registration.

## 3.3 Administrator

An administrator role is optional for the first release.

A future administrator interface may support investigation monitoring, abuse prevention, AI-generation error tracking, and content management.

---

# 4. USER JOURNEY

The application must follow the workflow below.

### Step 1: Landing Page

The user opens AI Mystery Room.

The landing page displays:

- Project name and description.
- A button to create a mystery.
- A short explanation of how the game works.
- Optional sample investigations.

### Step 2: Scenario Submission

The user enters a short story.

Example:

> During a college event, a valuable trophy disappeared from a locked room. Three students had access to the room, but everyone claims they left before the trophy went missing. Find out who took it.

The user may optionally select the difficulty level.

The application validates the input before sending it to the backend.

### Step 3: Investigation Generation

The backend sends a structured generation request to Gemini.

Gemini generates:

- The case title.
- The incident description.
- The culprit.
- The suspect list.
- Each suspect's background and motive.
- The event timeline.
- The evidence collection.
- Evidence interpretations and reliability.
- The correct solution.
- An explanation connecting the evidence to the culprit.

The backend validates the generated data and saves the investigation in MongoDB.

The application displays a loading state while the case is being prepared.

### Step 4: Investigation Room

The user enters the generated investigation.

The interface presents the case summary, suspects, and evidence categories.

Example evidence categories:

| Category | Evidence Type |
|---|---|
| Digital Messages | Fictional WhatsApp-style conversations |
| Photographic Evidence | AI-generated or AI-assisted fictional photographs |
| CCTV Evidence | Fictional surveillance stills or supported video clips |
| Witness Statements | Statements from fictional characters |
| Timeline | Events arranged chronologically |
| Physical Evidence | Descriptions or images of fictional objects |

Each evidence item must be linked to the investigation it belongs to.

### Step 5: Evidence Examination

The user selects evidence items to examine them.

Depending on the evidence type, the interface displays:

- The full message transcript.
- An image viewer.
- A video player or a sequence of surveillance stills.
- A witness statement.
- A timeline entry.
- A short evidence description.

The interface must distinguish observed evidence from interpretations or theories.

The culprit's identity and the final solution must remain hidden until the user submits an answer or explicitly reveals the solution.

### Step 6: Culprit Selection

The user selects one suspect from the suspect list.

The user then clicks **Submit Answer**.

The backend validates the selection and compares the selected suspect ID with the stored culprit ID.

The initial version should allow one final answer per investigation. If retry attempts are introduced later, they must follow an explicitly configured attempt policy.

### Step 7: Result Page

The application displays:

- Whether the user's answer was correct.
- The culprit's identity.
- The motive.
- A reconstructed timeline.
- The most important supporting clues.
- An explanation of misleading or contradictory evidence.
- The user's score, if scoring is enabled.

The solution must be derived from the stored investigation, not generated independently at the time of answer submission.

### Step 8: Play Again

The user can create another mystery from a new scenario.

The new investigation must receive a separate ID and its own suspects, evidence, and solution.

---

# 5. FUNCTIONAL REQUIREMENTS

This section defines the requirements that implementation and testing must follow.

## FR-001: Scenario Submission

**Description:** The application must accept a user-provided story or scenario.

Requirements:

1. Provide a text input area.
2. Require a non-empty scenario.
3. Enforce a configurable maximum input length.
4. Trim unnecessary whitespace.
5. Reject inputs that exceed the configured limit.
6. Display meaningful validation errors.
7. Allow optional difficulty selection.
8. Submit the scenario to the backend through an API request.

**Acceptance criteria:**

- Empty scenarios are rejected.
- Valid scenarios can be submitted.
- Invalid inputs do not trigger an AI-generation request.
- The frontend does not contain the Gemini API key.

## FR-002: Investigation Generation

**Description:** The backend must generate a complete investigation from the submitted scenario.

Requirements:

1. Send the scenario and generation settings to Gemini.
2. Request structured JSON output.
3. Validate the response against the investigation schema.
4. Verify that the culprit exists in the suspect list.
5. Verify that evidence references valid suspect IDs where applicable.
6. Verify that the case contains enough information to support a solution.
7. Retry generation within a configured limit when the response is invalid.
8. Save only a validated investigation.
9. Return a unique investigation ID.
10. Provide a useful error response if generation fails.

**Acceptance criteria:**

A successfully generated investigation must contain a case summary, a culprit, multiple suspects, a timeline, evidence items, and a solution explanation.

If generation fails, the application must not present a partially generated investigation as a completed case.

## FR-003: Suspect Generation

Every investigation must contain at least three suspects by default.

Each suspect must include:

- A unique suspect ID.
- A name.
- A short background.
- A relationship to the incident.
- A possible motive.
- Relevant known information.
- A fictional alibi or account of their actions.

The culprit must be one of the generated suspects.

The backend must preserve the suspect IDs throughout the investigation lifecycle.

**Acceptance criteria:** Every suspect referenced by the evidence or solution must exist in the investigation's suspect list.

## FR-004: Evidence Generation

The system must create multiple evidence items for each investigation.

The default target is six or more evidence items, although the exact number may depend on the selected difficulty.

Evidence should not simply repeat the same clue in different formats.

The collection should provide a reasonable balance of:

- Supporting clues.
- Contextual clues.
- Contradictory statements.
- Potentially misleading clues.
- Information that helps distinguish the culprit from innocent suspects.

Not every clue must independently identify the culprit. However, the complete evidence collection must support a coherent solution.

Each evidence item must include:

- A unique evidence ID.
- An evidence type.
- A title.
- A description.
- The evidence content or asset reference.
- A timestamp or relevant event time, when applicable.
- Relevant suspect references.
- An explanation of its significance, hidden from the user until the solution is revealed.
- A source or provenance label indicating how the evidence was created.

**Important:** The application must distinguish fictional evidence from real-world records. It must not claim that generated messages, photographs, or recordings are authentic records of actual events.

## FR-005: Evidence Exploration

The investigation interface must allow users to open and examine individual evidence items.

Requirements:

1. Display evidence by category.
2. Provide a detailed view for each item.
3. Support text-based evidence directly.
4. Support image evidence through an image viewer.
5. Support video evidence when a valid video asset is available.
6. Provide an appropriate fallback when an asset cannot be loaded.
7. Keep the final solution hidden during active investigation.
8. Prevent evidence from one investigation from appearing in another.

## FR-006: Culprit Selection

The application must allow the user to select a suspect.

Requirements:

1. Display all eligible suspects.
2. Allow one suspect to be selected.
3. Require a selection before submission.
4. Send the selected suspect ID to the backend.
5. Validate that the selected suspect belongs to the current investigation.
6. Reject invalid suspect IDs.
7. Prevent repeated submissions when the investigation has already been completed.

## FR-007: Answer Evaluation

The backend must evaluate the user's selected suspect against the stored culprit ID.

**Evaluation rule:**

`isCorrect = (selectedSuspectId === storedCulpritId)`

This comparison must be performed on the backend.

The backend must not accept a client-provided `isCorrect` value or culprit ID as the source of truth.

The evaluation response should include:

- The result.
- The selected suspect.
- The correct culprit.
- The solution explanation, if the investigation has been completed.

The correct culprit must not be exposed through normal investigation or evidence API responses before the solution is revealed.

## FR-008: Solution Reveal

The solution page must explain the case logically.

It must include:

1. The identity of the culprit.
2. The motive.
3. The sequence of events.
4. The strongest supporting clues.
5. The significance of contradictory evidence.
6. Why the alternative suspects were not responsible.

The solution must agree with the original generated investigation.

The application must not generate a new culprit or rewrite the evidence to justify a different answer.

## FR-009: Investigation Persistence

MongoDB must store validated investigations.

The system must preserve:

- The original scenario.
- Generation settings.
- The suspect list.
- The evidence collection.
- The timeline.
- The culprit ID.
- The solution explanation.
- The investigation status.
- Creation and completion timestamps, where applicable.

An investigation must remain internally consistent after it is retrieved from the database.

## FR-010: Investigation History

If implemented, investigation history must list previously saved cases.

Users should be able to reopen a case and see its evidence and completion status.

Completed cases must not silently return to an active state.

If registered accounts are supported, the backend must verify that the requesting user owns the investigation before granting access.

---

# 6. AI GENERATION SPECIFICATION

This is one of the most important parts of the project.

## 6.1 AI Responsibilities

Gemini is responsible for generating the fictional investigation content.

The AI generation process should produce a single structured case containing:

1. Case overview.
2. Suspect profiles.
3. Culprit identity.
4. Motive.
5. Event timeline.
6. Evidence items.
7. Evidence-to-suspect relationships.
8. Evidence interpretations.
9. Final solution.
10. Explanation of why the solution follows from the evidence.

## 6.2 Recommended Generation Architecture

For the MVP, use a **single case-generation request** that produces the investigation's core structure.

The backend then validates and stores the result.

Media generation should be handled separately from the logical case generation.

Recommended workflow:

```text
User Scenario
     |
     v
Express Backend
     |
     v
Gemini Case Generation
     |
     v
Structured JSON Response
     |
     v
Schema Validation
     |
     v
Investigation Consistency Checks
     |
     v
MongoDB Persistence
     |
     v
Investigation Room
```

Media generation follows a separate path:

```text
Validated Investigation
     |
     v
Evidence Asset Preparation
     |
     +----> Fictional Chat Transcripts
     |
     +----> Image Generation Integration
     |
     +----> Video Generation Integration
     |
     v
Asset Validation and Storage
     |
     v
Evidence Room
```

The case should remain playable if optional media generation fails.

## 6.3 Culprit Consistency Rules

The generation system must follow these rules:

- Exactly one primary culprit must be identified for the standard mystery mode.
- The culprit must exist in the suspect list.
- The culprit's motive must be defined.
- The timeline must not contradict the intended solution.
- Important evidence must support the intended solution.
- Innocent suspects may have suspicious circumstances, but their innocence must be explainable.
- Misleading clues must have a reasonable explanation.
- The final explanation must use evidence that already exists in the case.
- The answer evaluator must use the stored culprit ID.

For advanced cases involving accomplices, the specification must explicitly define whether the user is identifying one primary culprit or multiple responsible characters.

## 6.4 Gemini Output Format

Gemini should return structured JSON rather than unstructured prose.

The backend must validate the returned JSON before storing it.

Example conceptual structure:

```json
{
  "title": "The Missing Trophy",
  "scenario": "A trophy disappears during a college event.",
  "difficulty": "medium",
  "caseSummary": "A valuable trophy disappears from a locked room.",
  "suspects": [
    {
      "id": "suspect_01",
      "name": "Arun",
      "background": "A student who helped organize the event.",
      "motive": "He wanted the trophy for his team.",
      "alibi": "He claims he was outside the auditorium."
    },
    {
      "id": "suspect_02",
      "name": "Priya",
      "background": "A student responsible for event decorations.",
      "motive": "She had a disagreement with the organizers.",
      "alibi": "She claims she was preparing the stage."
    },
    {
      "id": "suspect_03",
      "name": "Karthik",
      "background": "A student who had access to the storage room.",
      "motive": "He wanted to prevent another team from winning.",
      "alibi": "He claims he left before the trophy disappeared."
    }
  ],
  "culpritId": "suspect_03",
  "timeline": [],
  "evidence": [],
  "solution": {
    "motive": "A fictional motive explaining the incident.",
    "explanation": "The explanation must agree with the evidence.",
    "keyEvidenceIds": []
  }
}
```

This is an illustrative example, not a complete valid investigation. Production validation must reject empty required collections and unresolved evidence references.

The final implementation should define the exact JSON Schema, including required fields, data types, enumerations, length limits, and reference rules.

---

# 7. AI-GENERATED EVIDENCE SPECIFICATION

Different evidence types require different implementation strategies.

## 7.1 WhatsApp-Style Messages

The system must generate fictional chat transcripts that resemble a messaging conversation.

Each transcript should include:

- Fictional participant names.
- Message timestamps.
- Message text.
- Sender identity.
- An optional conversation title.
- The evidence item's significance.

The initial version should render messages using a custom interface inspired by familiar messaging applications.

It must not connect to actual WhatsApp accounts or present generated messages as authentic WhatsApp exports.

## 7.2 AI-Generated Images

The system should support fictional photographs such as:

- A room containing suspicious objects.
- A fictional location relevant to the case.
- A scene showing an important clue.
- An object associated with a suspect.

The image-generation provider must be abstracted behind a backend service interface.

Gemini is the selected AI engine for case generation, but image-generation availability must be verified for the chosen model and API. If the selected Gemini model cannot generate the required images, use a compatible image-generation provider.

The backend must store the resulting asset reference and associate it with the correct evidence item.

## 7.3 CCTV-Style Evidence

The system should support:

- Fictional surveillance stills.
- Timestamped image sequences.
- Short fictional video clips when a compatible video-generation provider is configured.
- Textual descriptions of relevant camera observations.

For the MVP, CCTV-style still images and timestamped observations are sufficient.

Actual video generation should be treated as an optional extension rather than a mandatory dependency of investigation generation.

The interface must not claim that a generated still or clip is real surveillance footage.

## 7.4 Witness Statements

Witness statements should be generated as fictional text evidence.

Each statement must be associated with a fictional witness or suspect.

Statements may contain incomplete information, conflicting recollections, or intentional deception when those elements are consistent with the intended solution.

## 7.5 Evidence Quality Requirements

Every evidence item must satisfy the following:

- It belongs to one investigation.
- It has a unique identifier.
- Its content is consistent with the case timeline.
- Its references point to valid suspects or witnesses.
- It contributes to the investigation or provides useful context.
- Its source is clearly represented.
- It does not reveal the final answer prematurely.

---

# 8. TECHNICAL ARCHITECTURE

## 8.1 Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React.js | User interface and interactions |
| Routing | React Router | Navigation between pages |
| State Management | React state initially; Context or a suitable library as needed | Application and investigation state |
| HTTP Client | Fetch API or Axios | Communication with the backend |
| Backend | Node.js | Server-side JavaScript execution |
| API Framework | Express.js | REST API and request handling |
| Database | MongoDB | Investigation persistence |
| Data Modeling | Mongoose | Database schemas and validation |
| Generative AI | Google Gemini API | Case and evidence-content generation |
| Image/Video Generation | Compatible provider integration, if required | Optional visual asset creation |
| Asset Storage | Local development storage; object storage for deployment | Generated media storage |
| Authentication | Optional authentication solution | User identity and access control |
| Testing | Vitest or Jest, Supertest, and React Testing Library | Automated tests |

Specific library versions must be selected and pinned during implementation.

## 8.2 System Architecture

```text
                 USER
                   |
                   v
          REACT FRONTEND
                   |
                   v
           EXPRESS REST API
                   |
          +--------+---------+
          |                  |
          v                  v
    GEMINI SERVICE      MONGODB DATABASE
          |
          v
  STRUCTURED CASE DATA
          |
          v
  EVIDENCE ASSET SERVICE
          |
          v
  IMAGE / VIDEO PROVIDERS
      (OPTIONAL)
```

### Architecture Rules

1. The frontend must not call Gemini directly using a secret API key.
2. All secret API credentials must remain on the backend.
3. The backend is the authority for culprit identity and answer evaluation.
4. All persisted investigations must pass schema validation.
5. Media-generation services must be independent of the core investigation logic.
6. The backend must handle AI failures and database errors explicitly.
7. Investigation data returned to the frontend must exclude hidden solution fields until the appropriate stage.

---

# 9. DATABASE DESIGN

The initial implementation can use a small number of MongoDB collections.

## 9.1 Investigation Collection

**Collection:** `investigations`

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique investigation identifier |
| `title` | String | Investigation title |
| `scenario` | String | Original user-provided scenario |
| `difficulty` | String | easy, medium, or hard |
| `caseSummary` | String | Public investigation summary |
| `suspects` | Array | Suspect profiles |
| `timeline` | Array | Chronological events |
| `evidence` | Array | Evidence items and asset references |
| `culpritId` | String | Stored primary culprit ID |
| `solution` | Object | Motive and final explanation |
| `status` | String | generating, active, completed, or failed |
| `createdAt` | Date | Creation timestamp |
| `updatedAt` | Date | Last update timestamp |

**Security requirement:** The full database document must never be returned directly to the frontend. The API must construct a public response that excludes `culpritId` and hidden solution data until the solution is available.

## 9.2 User Collection

**Collection:** `users`

Required only if authentication is implemented.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique user ID |
| `displayName` | String | Display name |
| `email` | String | Unique account email |
| `passwordHash` | String | Password hash if password authentication is used |
| `createdAt` | Date | Account creation timestamp |

Authentication tokens, password hashes, and other private account data must never be exposed in public API responses.

## 9.3 Investigation Attempt Collection

**Collection:** `attempts`

This collection is optional for the MVP but recommended if scoring or investigation history is implemented.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique attempt ID |
| `investigationId` | ObjectId | Associated investigation |
| `userId` | ObjectId or null | Associated user, if registered |
| `selectedSuspectId` | String | User's selected suspect |
| `isCorrect` | Boolean | Evaluation result |
| `score` | Number | Score awarded |
| `submittedAt` | Date | Submission timestamp |

The attempt record must be created only after backend validation.

---

# 10. API SPECIFICATION

All endpoints should use the base path:

`/api/v1`

The following API contract defines the expected behavior.

## 10.1 Create Investigation

**Endpoint:** `POST /api/v1/investigations`

Request:

```json
{
  "scenario": "A trophy disappears during a college event.",
  "difficulty": "medium"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "investigationId": "generated_investigation_id",
    "status": "active",
    "title": "The Missing Trophy"
  }
}
```

Requirements:

- Validate the request.
- Generate and validate the case.
- Persist the investigation.
- Return the investigation ID.
- Never include the culprit ID in the creation response.

If generation may take longer than the request timeout, use an asynchronous job workflow instead. In that design, the endpoint returns `202 Accepted` with a job or investigation ID and a status endpoint is used to track progress.

## 10.2 Retrieve Investigation

**Endpoint:** `GET /api/v1/investigations/:id`

Returns the public case data.

Expected fields include:

- Investigation ID.
- Title.
- Scenario summary.
- Difficulty.
- Suspects.
- Timeline.
- Evidence metadata and content.
- Current status.

Must not return the hidden culprit ID or solution before the investigation is completed.

## 10.3 Retrieve Evidence

**Endpoint:** `GET /api/v1/investigations/:id/evidence/:evidenceId`

Returns the requested evidence item.

Requirements:

- Validate both IDs.
- Confirm that the evidence belongs to the requested investigation.
- Return only evidence information appropriate for the current investigation state.
- Return `404 Not Found` for missing investigations or evidence.

## 10.4 Submit Answer

**Endpoint:** `POST /api/v1/investigations/:id/answer`

Request:

```json
{
  "selectedSuspectId": "suspect_03"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "isCorrect": true,
    "status": "completed",
    "solution": {
      "culpritId": "suspect_03",
      "motive": "The fictional motive for the incident.",
      "explanation": "The evidence supports this conclusion."
    }
  }
}
```

This example shows the response after the user has submitted the answer and the solution has been revealed.

Requirements:

- Validate the investigation ID.
- Validate the suspect ID.
- Reject submissions for invalid or already completed investigations.
- Compare the submitted ID against the stored culprit ID.
- Return the result and solution according to the completion policy.

## 10.5 Retrieve Solution

**Endpoint:** `GET /api/v1/investigations/:id/solution`

Returns the stored solution after the investigation has been completed.

If early solution reveal is a supported feature, it must be explicitly implemented as a separate user action and reflected in the investigation state.

Otherwise, requests for the solution before completion must be rejected.

## 10.6 Error Response Format

All API errors should follow a consistent structure.

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SCENARIO",
    "message": "Please provide a valid scenario."
  }
}
```

Common HTTP status codes:

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 202 | Generation accepted for asynchronous processing |
| 400 | Invalid request |
| 401 | Authentication required |
| 403 | Access forbidden |
| 404 | Resource not found |
| 409 | Invalid state transition or conflicting submission |
| 413 | Input too large |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
| 502 | Invalid or unusable upstream AI response |
| 503 | AI service temporarily unavailable |

The backend must never expose API keys, stack traces, internal prompts, or sensitive implementation details in error messages.

---

# 11. FRONTEND UI/UX SPECIFICATION

The website should feel like an interactive detective investigation environment rather than a standard form-based application.

## 11.1 Required Pages

### Page 1: Landing Page

Components:

- Navigation bar.
- Project logo and name.
- Hero section.
- Scenario creation button.
- Brief instructions.
- Sample case cards, if available.

### Page 2: Scenario Creation Page

Components:

- Scenario text area.
- Character counter.
- Difficulty selector.
- Generate Mystery button.
- Input validation messages.
- Loading and failure states.

### Page 3: Investigation Room

Components:

- Investigation title and summary.
- Suspect panel.
- Evidence category navigation.
- Evidence list.
- Evidence detail viewer.
- Timeline panel.
- Culprit selection control.
- Submit Answer button.

### Page 4: Solution Page

Components:

- Correct or incorrect result.
- Culprit profile.
- Motive.
- Timeline reconstruction.
- Supporting evidence.
- Explanation of misleading clues.
- Play Again button.

### Page 5: Investigation History

Optional for the MVP.

Components:

- Previous cases.
- Completion status.
- Difficulty.
- Score, if enabled.
- Reopen investigation button.

## 11.2 Suggested Visual Direction

A suitable design direction is a dark investigative interface with:

- Charcoal or dark navy backgrounds.
- Muted neutral panels.
- High-contrast text.
- Accent colors for evidence categories and status indicators.
- Evidence cards styled like investigation files.
- Clear distinction between suspects, clues, and conclusions.

The interface must remain readable and usable on mobile screens.

## 11.3 Required UI States

Every major page must account for:

- Initial state.
- Loading state.
- Success state.
- Empty state.
- Validation error.
- Network error.
- AI-generation failure.
- Missing investigation.
- Missing evidence asset.
- Completed investigation.

The application must not remain indefinitely in a loading state when an API request fails.

---

# 12. NON-FUNCTIONAL REQUIREMENTS

## 12.1 Performance

- Standard API responses should be fast under normal operating conditions.
- AI generation may take longer than ordinary API requests and must display a clear progress state.
- Long-running generation must not block the Node.js event loop.
- Media assets should load independently where possible.
- The backend must enforce request timeouts and bounded retries.

A future load-testing phase should establish numerical performance targets based on deployment resources and expected traffic.

## 12.2 Reliability

- Database failures must produce controlled errors.
- Invalid AI responses must not become active investigations.
- Failed media generation must not corrupt the core investigation.
- Retries must be bounded.
- Duplicate generation requests should be handled according to an explicit idempotency policy.

## 12.3 Security

- Store API credentials in environment variables or a secrets manager.
- Never expose the Gemini API key in frontend code.
- Validate and sanitize user inputs.
- Rate-limit scenario generation.
- Limit input and output sizes.
- Protect private investigations if authentication is enabled.
- Prevent unauthorized access to stored media.
- Avoid logging sensitive credentials or private user information.
- Restrict allowed upload types if uploads are introduced.
- Ensure generated HTML or message content cannot execute as arbitrary code.
- Use secure session or token handling if authentication is implemented.

## 12.4 Accessibility

- Support keyboard navigation.
- Provide visible focus indicators.
- Use readable text contrast.
- Add alternative text for meaningful images.
- Provide captions or text alternatives for video evidence.
- Do not rely on color alone to communicate correctness or evidence status.

## 12.5 Maintainability

- Separate API routes, controllers, services, models, and validation logic.
- Keep Gemini-specific code inside a dedicated service layer.
- Separate investigation logic from media-generation logic.
- Use shared schemas and constants where appropriate.
- Document environment variables and setup instructions.
- Provide automated tests for critical business rules.

---

# 13. RECOMMENDED PROJECT STRUCTURE

```text
ai-mystery-room/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── SuspectCard.jsx
│       │   ├── EvidenceCard.jsx
│       │   ├── EvidenceViewer.jsx
│       │   └── Timeline.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── CreateMystery.jsx
│       │   ├── InvestigationRoom.jsx
│       │   ├── Solution.jsx
│       │   └── History.jsx
│       │
│       ├── services/
│       │   └── investigationApi.js
│       │
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── models/
│   │   │   ├── Investigation.js
│   │   │   ├── User.js
│   │   │   └── Attempt.js
│   │   │
│   │   ├── routes/
│   │   │   └── investigationRoutes.js
│   │   │
│   │   ├── controllers/
│   │   │   └── investigationController.js
│   │   │
│   │   ├── services/
│   │   │   ├── geminiService.js
│   │   │   ├── investigationService.js
│   │   │   ├── evidenceService.js
│   │   │   └── mediaGenerationService.js
│   │   │
│   │   ├── validators/
│   │   │   └── investigationSchema.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   │
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── tests/
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

This is the recommended starting structure. Optional modules can be added only when their features are implemented.

---

# 14. ERROR HANDLING AND EDGE CASES

The application must handle the following situations.

| Scenario | Expected Behavior |
|---|---|
| Empty scenario | Reject with a validation message. |
| Scenario exceeds input limit | Reject without calling Gemini. |
| Gemini request fails | Return a controlled error or generation status. |
| Gemini returns invalid JSON | Validate, retry within limits, or fail safely. |
| Culprit is not in suspect list | Reject the generated case. |
| Evidence references unknown suspect | Reject or regenerate the invalid case. |
| Contradictory timeline | Run consistency checks and reject or regenerate if unresolved. |
| Database save fails | Do not report the investigation as successfully created. |
| Image generation fails | Retain a playable investigation and use an appropriate fallback. |
| Video asset unavailable | Display stills or a textual evidence alternative. |
| Invalid investigation ID | Return 404. |
| Invalid suspect selection | Reject the answer submission. |
| Duplicate answer submission | Reject or return the existing result according to the submission policy. |
| User reloads the investigation | Restore the saved investigation state. |
| API rate limit reached | Return a clear rate-limit response. |

---

# 15. TESTING REQUIREMENTS

## 15.1 Unit Testing

Test individual functions such as:

- Scenario validation.
- AI response parsing.
- Investigation schema validation.
- Suspect reference validation.
- Evidence reference validation.
- Culprit consistency checks.
- Answer evaluation.
- Solution access control.

## 15.2 Integration Testing

Test:

- MongoDB connection.
- Investigation creation API.
- Gemini service integration.
- Investigation retrieval.
- Evidence retrieval.
- Answer submission.
- Solution retrieval.
- Failure handling and retry behavior.

Gemini should be mocked in most automated tests so that tests are predictable, fast, and inexpensive.

A smaller set of integration tests may use the actual Gemini API.

## 15.3 Frontend Testing

Test:

- Scenario form validation.
- Difficulty selection.
- Loading indicators.
- Suspect selection.
- Evidence viewing.
- Submission behavior.
- Result rendering.
- Error messages.
- Mobile layout.

## 15.4 End-to-End Testing

A complete end-to-end test must verify that:

1. A user submits a valid scenario.
2. An investigation is generated or a deterministic test fixture is used.
3. The backend saves the investigation.
4. The frontend displays the suspects and evidence.
5. The user selects a suspect.
6. The backend evaluates the selection.
7. The solution page reveals the correct culprit.
8. The explanation matches the stored investigation.

## 15.5 AI Quality Testing

Automated structural validation alone is insufficient to guarantee a good mystery.

AI-generated investigations should also be evaluated for:

- Internal consistency.
- Evidence relevance.
- Timeline coherence.
- Fairness of the solution.
- Plausibility of suspect motives.
- Absence of unsupported conclusions.
- Agreement between the stored solution and the evidence.

For the MVP, use deterministic validation rules and a manually reviewed set of generated cases. More advanced automated quality scoring can be introduced later.

---

# 16. ACCEPTANCE CRITERIA

The project is considered ready for its initial release when the following conditions are satisfied.

### Scenario Generation

- [ ] Users can submit valid scenarios.
- [ ] Invalid scenarios are rejected.
- [ ] Gemini generates structured investigation data.
- [ ] Invalid AI responses are not stored as completed investigations.

### Investigation Data

- [ ] Each case contains at least three suspects.
- [ ] Each case contains multiple evidence items.
- [ ] Every suspect and evidence reference is valid.
- [ ] The case has one predetermined primary culprit.
- [ ] The timeline and solution are consistent with the evidence.

### Evidence Room

- [ ] Users can browse and open evidence.
- [ ] Supported evidence formats render correctly.
- [ ] Missing media does not break the investigation.
- [ ] The hidden solution is not exposed through public API responses.

### Culprit Selection

- [ ] Users can select one suspect.
- [ ] The backend validates the selection.
- [ ] Correct answers are evaluated accurately.
- [ ] Incorrect answers are evaluated accurately.
- [ ] Duplicate submissions are handled according to the defined policy.

### Solution

- [ ] The final culprit matches the stored culprit ID.
- [ ] The motive is displayed.
- [ ] The explanation references the investigation's existing evidence.
- [ ] The solution cannot change between retrievals.

### Engineering

- [ ] MongoDB persistence works.
- [ ] Gemini credentials remain on the backend.
- [ ] API errors are handled consistently.
- [ ] Critical business logic has automated tests.
- [ ] The application works on desktop and mobile.
- [ ] Setup instructions are documented.

---

# 17. IMPLEMENTATION ROADMAP

The development process should follow the specification rather than building features in an arbitrary order.

## Phase 1: Foundation

**Goal:** Establish the project structure and core infrastructure.

Tasks:

1. Initialize the React frontend.
2. Initialize the Node.js and Express backend.
3. Configure MongoDB.
4. Configure environment variables.
5. Create a health-check endpoint.
6. Establish API error handling.
7. Add request validation.
8. Configure automated testing.

**Exit condition:** The frontend can communicate with the backend, and the backend can communicate with MongoDB.

## Phase 2: Investigation Engine

**Goal:** Generate and persist complete mysteries.

Tasks:

1. Define the investigation JSON schema.
2. Implement the Gemini service.
3. Create the case-generation prompt.
4. Validate structured AI responses.
5. Implement consistency checks.
6. Store validated cases in MongoDB.
7. Implement investigation retrieval.
8. Add generation failure handling.

**Exit condition:** A valid scenario produces a saved, internally consistent investigation.

## Phase 3: Investigation Interface

**Goal:** Allow users to investigate a case.

Tasks:

1. Build the landing page.
2. Build the scenario submission form.
3. Build the suspect panel.
4. Build the evidence room.
5. Implement the evidence detail viewer.
6. Implement the timeline component.
7. Add loading and error states.
8. Connect the frontend to the backend APIs.

**Exit condition:** A user can submit a scenario and explore the generated investigation.

## Phase 4: Culprit Selection and Solution

**Goal:** Complete the core mystery-solving experience.

Tasks:

1. Implement suspect selection.
2. Implement answer submission.
3. Add backend answer evaluation.
4. Implement investigation completion state.
5. Build the solution page.
6. Ensure hidden answers are not leaked before completion.
7. Test correct, incorrect, and duplicate submissions.

**Exit condition:** The entire mystery-solving workflow works from start to finish.

## Phase 5: Evidence Media

**Goal:** Add richer fictional evidence.

Tasks:

1. Render realistic fictional chat interfaces.
2. Integrate an image-generation provider.
3. Store generated images.
4. Implement image viewing.
5. Add CCTV-style evidence.
6. Add video playback if compatible video assets are available.
7. Add fallbacks for failed media generation.
8. Validate that media assets match their investigation.

**Exit condition:** The investigation supports multiple evidence formats without depending on any single media provider.

## Phase 6: Quality and Deployment

**Goal:** Prepare the application for real users.

Tasks:

1. Complete automated testing.
2. Review AI output quality.
3. Test security and authorization.
4. Add rate limiting.
5. Test mobile responsiveness.
6. Configure production environment variables.
7. Deploy the frontend and backend.
8. Configure production database and asset storage.
9. Monitor failures and generation costs.
10. Verify the complete production workflow.

**Exit condition:** The application can be deployed, monitored, and used reliably.

---

# 18. SPEC-DRIVEN DEVELOPMENT RULES

This section governs how future development work must be performed.

## Rule 1: The Specification Is the Source of Truth

All implementation decisions must follow this document.

If a feature is not defined, the developer or AI coding agent must identify the missing requirement rather than silently inventing major behavior.

## Rule 2: Every Feature Must Have Acceptance Criteria

Before implementing a feature, define how its correctness will be verified.

## Rule 3: Validate Before Building

The relevant API contracts, data schemas, and state transitions must be defined before implementation begins.

## Rule 4: Build in Small, Verifiable Tasks

Each implementation task should have:

- A defined objective.
- Its dependencies.
- Relevant specification references.
- Expected files or components.
- Acceptance criteria.
- Tests.

## Rule 5: Test Before Marking Complete

A feature is not complete merely because the code has been written.

Its acceptance criteria must be satisfied and its tests must pass.

## Rule 6: Update the Specification When Requirements Change

If a feature needs to change, update the specification before implementing the new behavior.

Record meaningful changes in a change log.

## Rule 7: Never Violate Investigation Consistency

No frontend component, AI prompt, or backend endpoint may independently invent or change the culprit after a case has been saved.

## Rule 8: Keep Secrets and Authoritative Logic on the Backend

AI credentials, culprit evaluation, and hidden solution data must remain under backend control.

---

# 19. IMPORTANT DESIGN DECISIONS

The following decisions are recommended for the initial implementation.

| Decision | Initial Approach |
|---|---|
| Primary AI engine | Google Gemini |
| Investigation generation | One structured case-generation operation |
| Primary culprit | Exactly one per standard investigation |
| Minimum suspects | Three |
| Evidence quantity | Six or more as the default target |
| Evidence storage | Embedded in the investigation document initially |
| Image generation | Separate provider integration |
| Video generation | Optional extension |
| Answer evaluation | Backend comparison against stored culprit ID |
| Solution generation | Generated and stored with the original investigation |
| Authentication | Optional |
| Investigation history | Should Have |
| Difficulty levels | Easy, Medium, Hard |
| Case state | Generating, Active, Completed, Failed |
| Failed media | Fallback evidence presentation |
| User-submitted scenarios | Validated and length-limited |
| Testing | Unit, integration, frontend, and end-to-end |
| Deployment | Separate frontend, backend, database, and media storage as appropriate |

These defaults should be treated as approved project decisions only after you confirm them. Any decision that changes the intended product should be recorded explicitly.

---

# 20. FINAL DEFINITION OF DONE

AI Mystery Room's MVP is complete when a user can enter a fictional scenario, receive a coherent AI-generated investigation, examine its evidence, identify a suspect, submit an answer, and view an explanation that matches the original case.

The application must preserve the investigation across requests, handle AI and media failures safely, protect hidden solution data, and provide a responsive interface.

The core investigation must work even when advanced image or video generation is unavailable.

**The most important success criterion is not merely generating a convincing mystery. It is generating a mystery that can actually be solved using its own evidence.**

---

## Recommended Next Step

Before asking an AI coding agent to implement this specification, I recommend creating three additional artifacts:

1. **`data-model.md`** — exact MongoDB schemas and investigation state transitions.
2. **`api-contract.md`** — complete request/response schemas for every endpoint.
3. **`implementation-plan.md`** — small, ordered development tasks with acceptance tests.

These documents will make the specification much more useful for spec-driven development because they translate the high-level project requirements into precise implementation contracts.

**One critical decision to settle before implementation:** Should the AI generate the entire case, including its final culprit and evidence, in one operation, or should the backend generate the culprit and timeline first and then generate evidence against that fixed case? I recommend the second approach for stronger consistency, even though it requires more orchestration.