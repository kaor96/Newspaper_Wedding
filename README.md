# Wedding Newspaper Cover Generator

A mobile-first web app that turns candid guest photos into fake newspaper front pages, printed on A4 as a surprise wedding souvenir.

> Personal project. Built for my wedding, not for public use — yet.

---

## Why this exists

Saw a street photographer in Los Angeles handing tourists fake LA Times covers with their photo on it. It was such a simple, memorable detail that we wanted to bring it to our wedding in Ecuador. Nothing like this existed as a simple tool a non-technical person could operate from their phone at a live event, so I built it.

---

## What it does (v1)

- Brother opens the app on his iPhone, uploads a candid photo of guests
- Picks one of 3 newspaper templates (Spanish and English)
- Taps or types a headline — live preview updates instantly
- Hits print — A4 cover comes out of the WiFi printer in under a minute
- Guest receives a personalized newspaper front page as a physical keepsake

---

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript — single index.html file
- **Backend:** None
- **Data storage:** None — stateless, nothing is saved
- **Hosting:** Runs locally in Safari on iPhone, saved to Home Screen

---

## How to run it locally

No install needed. Just open the file:

```bash
# Clone the repo
git clone https://github.com/yourusername/wedding-newspaper.git

# Open directly in your browser
open index.html
```

For iPhone: open `index.html` in Safari via a local WiFi server or
transfer the folder to your phone. Save to Home Screen for offline use.

---

## Project structure
wedding-newspaper/
├── CLAUDE.md              # Instructions for Claude Code (read every session)
├── README.md              # This file
├── index.html             # The entire app
├── print.css              # A4 print layout — most critical file
├── assets/
│   ├── logo-gaceta.svg    # La Gaceta de la Boda masthead
│   ├── logo-universo.svg  # El Universo masthead
│   └── logo-nyt.svg       # New York Times masthead
└── templates/
├── gaceta.js          # Elegant cream wedding template
├── eluniverso.js      # Bold breaking news template
└── nyt.js             # Clean prestigious template

---

## Scope decisions

**Built for v1:**
- 3-step mobile flow: pick template → upload photo → headline → print
- 3 templates: La Gaceta de la Boda, El Universo, The New York Times
- Editable headline with tappable suggestions per template
- Live preview, offline support, A4 print via browser dialog

**Deliberately cut from v1:**
- No backend, no database, no user accounts
- No more than 3 templates
- No collages or multiple photos
- No QR codes or digital sharing
- No English templates (yet)
- No npm packages or build step — zero dependencies by design

**Why these cuts:** Hard deadline of May 29, 2026. The wedding doesn't
wait. Ship simple, validate the concept live, improve after.

---

## Status

In development — wedding day is May 29, 2026 in Ecuador.