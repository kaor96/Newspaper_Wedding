# Project: Wedding Newspaper Cover Generator

## What this is
A mobile-first single-page web app that lets my brother photograph wedding guests on his phone, drop the photo into a fake newspaper front page template, and print it on A4 as a physical keepsake souvenir.

## Who uses it
Just my brother, operating it on his phone at my wedding on May 29, 2026 in Ecuador. Guests never touch the app — they only receive the printed output.

Because of that, skip:
- User accounts, login, signup flows
- Password hashing or authentication systems
- Polished marketing/landing pages
- Defensive coding against malicious users
- Internationalization, accessibility audits beyond basic sanity
- Cookie banners, privacy policies, terms of service

Focus instead on: doing the actual job well, on one iPhone, connected to one WiFi printer, for one night.

## Tech stack
- **Frontend:** Plain HTML/CSS/JS — single index.html file, no framework, no build step
- **Backend:** None
- **Data storage:** None — stateless, everything lives in the session
- **Hosting:** Runs locally only — opened in Safari, saved to iPhone Home Screen
- **Other key libraries:** None — zero dependencies by design

## Commands
- **Dev:** Open `index.html` directly in Safari (no server, no build step)
- **Build:** None
- **Lint / format:** None
- **Test on device:** Serve via `python -m http.server` on laptop, then open laptop's IP in iPhone Safari on same WiFi

## Data model
Stateless — no persisted data. Everything lives in the current session and is discarded after each print.

In-session shape:
```
SelectedTemplate { id, name, mastheadFont, paperColor }
GuestPhoto { dataUrl, cropOffset }
Headline { text }
```

## Secrets / env
None — no API keys, no env vars, no `.env` file. Fully offline app.

## Core features (v1)
The smallest version that's actually useful to me. Build only these.
- [ ] 3-step mobile flow: pick template → upload photo → edit headline → print
- [ ] Photo upload from camera roll or direct camera capture on iPhone
- [ ] 3 templates: La Gaceta de la Boda (elegant/cream), El Universo (bold/breaking news), The New York Times (clean/prestigious)
- [ ] Editable headline with 3 tappable suggested headlines per template in Spanish
- [ ] Live newspaper preview that updates as you type
- [ ] Print button that sends A4 layout to WiFi printer via browser native print dialog
- [ ] Works fully offline after first load

## Explicitly NOT in v1
Things I'm tempted to add but am deliberately cutting from v1.
Saved here so I don't forget them, but don't build them yet.
- More than 3 templates
- English-language templates
- Multiple photos or collage layouts
- QR codes or digital sharing
- Save history or print queue
- Any backend, database, or cloud storage
- Custom color or font picker per template
- Business/product version (comes after the wedding)

## How I want to work with you (Claude Code)
- Make small, focused changes I can review one at a time
- After each working change, suggest a commit message and pause
- Ask before adding new dependencies (this is a zero-dep project — the answer is almost always no)
- Prefer simple, boring solutions over clever ones
- When you finish a task, briefly summarize what you changed
- **When to ask vs. guess:**
  - Ask before: changing print layout offsets, deleting/overwriting files, destructive git ops
  - Just guess: file naming, where to put a new file, variable names, minor styling
- **Code style:** match existing patterns in `index.html` and `print.css`. On day 1, follow Code conventions below.

## Definition of done
A task isn't done when the page loads — it's done when:
- I can run the full 3-step flow on iPhone Safari without crashes
- The print preview matches A4 dimensions and respects the pre-printed border offset
- If you couldn't actually test on device, say so — don't claim success based on desktop preview alone

## Code conventions
- File naming: kebab-case for files (`print.css`, `logo-gaceta.svg`)
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Indentation: 2 spaces
- No TypeScript — plain JS only
- No comments explaining obvious things — only comment non-obvious decisions

## Out of scope / things to avoid
- Don't suggest TypeScript unless I ask
- Don't add testing frameworks unless I ask
- Don't refactor working code unless I ask
- Don't add analytics, tracking, or telemetry of any kind
- Don't generate placeholder lorem ipsum content — ask me what should go there
- Don't add npm packages — this is a zero-dependency project
- Don't use CSS frameworks like Tailwind or Bootstrap

## Project-specific context
- The app will be used exclusively on one iPhone in Safari — all tap targets must be at least 44px
- Print layout is the most critical feature — the photo must land correctly on A4 (210mm × 297mm)
- My brother will pre-print the decorative newspaper border on A4 sheets in bulk, then feed those sheets back into the printer — only the guest photo prints on top. The photo placement in print.css must account for this offset precisely
- Templates should feel like real newspapers, not Canva templates — aged cream paper (#f9f6e8), bold serif mastheads, thin rule lines, sidebar filler columns
- I am a design engineer comfortable with HTML/CSS — you don't need to over-explain basic web concepts, but do flag non-obvious print/CSS decisions
- Wedding date: May 29, 2026 — this is a hard deadline, ship simple

## Current status
Just initialized — no features built yet. Start by scaffolding index.html with the full 3-step mobile flow, then print.css, then the 3 template config files.