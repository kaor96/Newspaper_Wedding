# Project: [REPLACE WITH PROJECT NAME]

> Replace every [BRACKETED PLACEHOLDER] before starting to build.
> Delete this quote block when you're done filling it in.

## What this is
[One sentence describing what this project does. Example: "A personal tool to track my contributions toward the Ecuador real estate project, with progress visualization and payment logging."]

## Who uses it
Just me. This is a personal project, not a public product.

Because of that, skip:
- User accounts, login, signup flows
- Password hashing or authentication systems
- Polished marketing/landing pages
- Defensive coding against malicious users
- Internationalization, accessibility audits beyond basic sanity
- Cookie banners, privacy policies, terms of service

Focus instead on: doing the actual job well, for me, on my devices.

## Tech stack
- **Frontend:** [e.g., React + Vite, plain HTML/CSS/JS, Next.js, Expo + React Native]
- **Backend:** [e.g., none, Node + Express, Python + FastAPI, Supabase]
- **Data storage:** [e.g., localStorage, JSON file, SQLite, Supabase Postgres]
- **Hosting:** [e.g., runs locally only, Vercel, Cloudflare Pages, my VPS]
- **Other key libraries:** [list any non-obvious ones]

## Core features (v1)
The smallest version that's actually useful to me. Build only these.
- [ ] [Feature 1 — be specific]
- [ ] [Feature 2]
- [ ] [Feature 3]

## Explicitly NOT in v1
Things I'm tempted to add but am deliberately cutting from v1.
Saved here so I don't forget them, but don't build them yet.
- [Tempting feature I'm cutting]
- [Another one]

## How I want to work with you (Claude Code)
- Make small, focused changes I can review one at a time
- After each working change, suggest a commit message and pause
- Ask before adding new dependencies (npm packages, etc.)
- Prefer simple, boring solutions over clever ones
- If a task is ambiguous, ask ONE clarifying question rather than guessing
- Match the existing code style already in the project
- When you finish a task, briefly summarize what you changed

## Code conventions
- File naming: kebab-case for files (`payment-tracker.js`)
- Components: PascalCase (`PaymentTracker.jsx`)
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Indentation: 2 spaces
- [Add any other rules I care about]

## Out of scope / things to avoid
- Don't suggest TypeScript unless I ask
- Don't add testing frameworks unless I ask
- Don't refactor working code unless I ask
- Don't add analytics, tracking, or telemetry of any kind
- Don't generate placeholder lorem ipsum content — ask me what should go there

## Project-specific context
[Anything Claude Code should know that isn't obvious from the code itself.

Examples:
- "Ecuador project context: 4 contributors, 40/40/20/1 equity split, $80K total budget, target completion end of 2026."
- "This app will eventually run on my phone — keep tap targets at least 44px."
- "I'm a design engineer, not a web dev. Explain non-obvious patterns when you use them."
]

## Current status
[Update this as the project evolves. Examples:
- "Just initialized — no features built yet"
- "v1 complete, now adding [feature X]"
- "Refactoring data layer to use SQLite"
]
