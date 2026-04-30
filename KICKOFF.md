# Project Kickoff

> Run through this BEFORE writing any code.
> Total time: ~45 minutes. Saves days of building the wrong thing.

---

## Phase 1: Brainstorm (15-30 min)

Open Claude (claude.ai or desktop app) and paste this prompt:

> I want to build a new project. Help me think it through before I write any code. Ask me one question at a time about: what problem this solves for me, who uses it (probably just me), the single most important thing it must do, what success looks like, and what could go wrong. Don't move on until my answer is clear. At the end, summarize what I described in 3-5 bullet points.

**Output:** Paste the final summary into the "What this is" and "Project-specific context" sections of CLAUDE.md.

---

## Phase 2: Scope (15 min)

In the same Claude conversation (or a new one with the Phase 1 summary pasted in), use this prompt:

> Based on this, help me define the smallest version I can ship to myself in one weekend. List: (1) the must-have features for v1, (2) features explicitly cut from v1 (saved for later), (3) the tech stack you recommend with reasoning, (4) the rough file/folder structure. Be opinionated.

**Output:** Fill in CLAUDE.md sections:
- Tech stack
- Core features (v1)
- Explicitly NOT in v1

Paste the full scope conversation into README.md so future-you remembers the reasoning.

---

## Phase 3: Setup checklist

- [ ] Created project folder under `C:\Users\kvnor\Projects\`
- [ ] Used `_template` repo as starting point (or copied template files in)
- [ ] Filled in all [BRACKETED PLACEHOLDERS] in CLAUDE.md
- [ ] Pasted Phase 2 spec into README.md
- [ ] Ran `git init` (or it was already done by template)
- [ ] First commit made
- [ ] Pushed to GitHub as private repo

---

## Phase 4: Build

Open Claude Code in VS Code. Because CLAUDE.md is filled in, Claude already knows what you're building.

Rules during build:
- [ ] Commit after every working change (small, focused commits)
- [ ] Write commit messages your future self will understand
- [ ] When stuck, re-read CLAUDE.md — am I building what I scoped?
- [ ] When tempted to add a feature, check the "NOT in v1" list

---

## When v1 works

- [ ] Update CLAUDE.md "Current status" to "v1 complete"
- [ ] Move features from "NOT in v1" to a new "v2 candidates" section as you decide what's next
- [ ] Celebrate. You shipped something.
