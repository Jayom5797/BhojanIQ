# BhojanIQ — Code Map

> Living document. Update whenever you add/move/rename a file.
> Purpose: fast bug localization without grepping the whole repo.

---

## Project Structure

```
bhojaniq/
├── client/                          # React + Vite frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.jsx       # Fixed top nav (shared across all pages)
│       │   │   └── Footer.jsx       # Footer (shared across all pages)
│       │   ├── ui/
│       │   │   ├── DecisionBadge.jsx  # Eat/Modify/Avoid badge with glow
│       │   │   ├── ContextPanel.jsx   # Right sidebar: goal/diet/budget/time
│       │   │   └── GlassCard.jsx      # Reusable glassmorphism card wrapper
│       │   └── onboarding/
│       │       └── StepIndicator.jsx  # Progress dots for onboarding steps
│       ├── pages/
│       │   ├── Landing.jsx          # Hero + feature cards + CTA
│       │   ├── Onboarding.jsx       # 3-step profile setup
│       │   ├── Analyze.jsx          # Main input screen (image + text + context)
│       │   ├── DecisionResult.jsx   # Output: verdict + suggestions + alternatives
│       │   ├── MealHistory.jsx      # Timeline log of past analyses
│       │   └── HowItWorks.jsx       # Explainer + tech stack badges
│       ├── services/
│       │   └── api.js               # All axios calls to Express backend
│       ├── context/
│       │   └── UserContext.jsx      # Global state: user profile, session
│       ├── App.jsx                  # Router setup
│       ├── main.jsx                 # Entry point
│       └── index.css                # Tailwind directives + global styles
│
├── server/                          # Node + Express API (deployed to Cloud Run)
│   ├── index.js                     # Entry point, mounts all routes
│   ├── routes/
│   │   ├── analyze.js               # POST /api/analyze — main endpoint
│   │   └── history.js               # GET/POST /api/history — Firestore CRUD
│   ├── engine/
│   │   └── decisionEngine.js        # Orchestrates GCP services → decision
│   └── services/
│       ├── visionService.js         # Cloud Vision API — image → food labels
│       ├── nlpService.js            # Cloud Natural Language API — text → entities
│       ├── geminiService.js         # Vertex AI Gemini — decision + explanation
│       ├── translateService.js      # Cloud Translation API — multilingual input
│       ├── firestoreService.js      # Firestore — session/history read/write
│       ├── storageService.js        # Cloud Storage — uploaded image persistence
│       └── loggingService.js        # Cloud Logging — structured request logs
│
├── .gitignore
├── CODEMAP.md                       # This file
└── package.json                     # Root scripts (optional monorepo)
```

---

## Data Flow

```
User (image or text input)
  → Analyze.jsx (FE)
  → api.js → POST /api/analyze
  → analyze.js (route)
      ├── storageService.js     (upload image to Cloud Storage)
      ├── visionService.js      (image → food labels)       [if image]
      ├── nlpService.js         (text → food entities)      [if text]
      ├── translateService.js   (non-English → English)     [if needed]
      └── decisionEngine.js
              └── geminiService.js  (Gemini → decision + explanation)
  → firestoreService.js         (save result to history)
  → loggingService.js           (log request to Cloud Logging)
  → JSON response { decision, foodDetected, explanation, suggestions, alternatives }
  → DecisionResult.jsx (renders output)
```

---

## GCP Services Map (9 services)

| Service | File | What it does |
|---|---|---|
| Cloud Vision API | `visionService.js` | Detects food from uploaded image |
| Cloud Natural Language API | `nlpService.js` | Extracts food entities from text input |
| Vertex AI (Gemini) | `geminiService.js` | Core decision engine — replaces brittle rules |
| Cloud Translation API | `translateService.js` | Handles non-English food descriptions |
| Firestore | `firestoreService.js` | Stores user profile + meal history |
| Firebase Auth | `UserContext.jsx` + server middleware | User identity |
| Cloud Storage | `storageService.js` | Persists uploaded food images |
| Cloud Run | `server/` | Hosts the Express backend |
| Cloud Logging | `loggingService.js` | Structured request/error logging |

---

## Pages → Components Map

| Page | Key Components | Route |
|---|---|---|
| `Landing.jsx` | `Navbar`, `Footer`, feature cards | `/` |
| `Onboarding.jsx` | `StepIndicator`, goal/diet/budget forms | `/onboarding` |
| `Analyze.jsx` | image dropzone, textarea, `ContextPanel` | `/analyze` |
| `DecisionResult.jsx` | `DecisionBadge`, suggestions chips, alternatives | `/result` |
| `MealHistory.jsx` | timeline cards, filter bar | `/history` |
| `HowItWorks.jsx` | step cards, tech stack badges | `/how-it-works` |

---

## API Endpoints

| Method | Endpoint | Handler | Description |
|---|---|---|---|
| POST | `/api/analyze` | `routes/analyze.js` | Main analysis — image or text |
| GET | `/api/history/:userId` | `routes/history.js` | Fetch user meal history |
| POST | `/api/history` | `routes/history.js` | Save analysis result |
| GET | `/health` | `index.js` | Health check for Cloud Run |

---

## Design System (from Stitch)

- Background: `#0c0e14` (The Void)
- Surface: `#171921` (containers)
- Primary: `#2ff3ad` (electric mint — decisions, CTAs)
- Secondary: `#9691ff` (purple — data viz, chips)
- Tertiary: `#78e6ff` (cyan — tertiary accents)
- Error: `#ff716c` (Avoid state)
- Fonts: Space Grotesk (headlines) + Inter (body)
- Glass panels: `rgba(35,38,46,0.4)` + `backdrop-blur: 12px`
- Roundness: 8px default, 12px cards, full for pills

---

## Environment Variables (server/.env)

```
PORT=5000
GOOGLE_CLOUD_PROJECT_ID=...
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
FIREBASE_PROJECT_ID=...
GCS_BUCKET_NAME=bhojaniq-uploads
GEMINI_MODEL=gemini-1.5-pro
```

---

## Common Bug Locations

| Symptom | Look here first |
|---|---|
| Wrong decision output | `geminiService.js` → prompt template |
| Food not detected from image | `visionService.js` → label confidence threshold |
| Text input not parsed | `nlpService.js` → entity type filter |
| History not saving | `firestoreService.js` → collection path |
| Image upload failing | `storageService.js` → bucket permissions |
| CORS errors | `server/index.js` → cors config |
| Context not persisting | `UserContext.jsx` → localStorage sync |
| Auth not working | Firebase Auth config in `UserContext.jsx` |
