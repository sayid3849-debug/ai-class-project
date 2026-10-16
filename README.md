# SKILL & LEARN

**Learn the Game. Master Your Skills. Become a Champion.**

An interactive, client-side soccer academy for ages 6–10. Built with React, TypeScript, Vite, React Router, Motion, and Lucide. Original SVG illustrations and locally bundled fonts keep the experience independent of external image and font services.

## Run locally

Use Node.js **22.12+** (Node 24 is verified).

```bash
npm ci
npm run dev
```

Vite serves the application on port 5173. In this cloud workspace, use `npm ci --cache /workspace/.npm-cache` if the default npm cache is not writable. No environment variables, account, database, or API credentials are needed for the application.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` produces `dist/`. Serve that directory with an SPA fallback to `index.html` so direct links such as `/academy/1` work. Vite’s dev and preview servers already provide that fallback. Publishing and hosting are separate from building the app.

## What works

- A responsive stadium homepage, illustrated academy journey, eight main destinations, and mobile navigation.
- Five levels with **20 complete lessons**, interactive field markers, position matching (drag-and-drop, click, touch, or keyboard), optional browser read-aloud, and lesson knowledge checks.
- A randomized quiz engine with immediate explanations, hints, 10 points per correct answer, an 80% pass threshold, best scores, retries, and a 15-question champion final.
- Five real-world practice missions with step-by-step instructions, safety reminders, practice counters, parent-assisted recording, and shooting target counts.
- A level unlock requires all four lessons, a passing quiz, and that level’s practice mission. Missions can be practiced independently at any time.
- Progress, quiz personal bests, and practice logs persist in localStorage. XP is derived from unique lessons (20 each), unique missions (50 each), and quiz personal bests. Maximum academy XP is 1,000. Repeats do not inflate rewards.
- Six milestone badges, a progress chart, real statistics starting at zero, animated celebrations, and a printable champion certificate after completing all five levels.
- Parent information, privacy explanations, and an explicit confirmation before resetting this device’s progress.

## AI Coach: demonstration only

The coach uses **original illustrated movement loops and prewritten sample reports** for dribbling, passing, shooting, and ball control. All scores are labeled as examples. It does not analyze video, run a computer-vision model, or measure the student. Play/pause controls operate the illustration. Real uploads, camera access, and child-video submissions are not available.

`src/coach.ts` defines the demo provider boundary. A future real service needs a separately designed consent and privacy system (verified parental consent, private storage, access controls, deletion safeguards) and truthful observable measurements before accepting any child’s media. No API keys belong in the client bundle.

## Local data and accessibility

Progress uses the versioned key `skill-learn-progress-v1` in this browser. It is not an authenticated profile, does not sync between devices, and may be removed by clearing browser data. Corrupt data is filtered; unavailable storage shows a session-only warning. The parent area is informational, not a secured parental-control system. No names, contact details, public profiles, public leaderboards, analytics, or videos are collected by the app.

Navigation and activities support keyboards, visible focus, live feedback, reduced motion, and responsive layouts. Position matching has a click/tap alternative to dragging. Read-aloud uses the browser’s speech synthesis service and includes unsupported/error fallback messaging; voice availability and any processing depend on the browser and device. The certificate uses a fictional player label rather than requesting a child’s name.

## Tests

```bash
npm test                       # Progression, rewards, persistence, curriculum integrity
npx playwright install chromium # Standard browser setup, if needed
npm run test:e2e                # Browser flows and responsive checks
```

This cloud machine already supplies Chromium. Use it without a browser download:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

The browser tests start Vite automatically (or reuse an existing server on port 5173), exercise lesson/quiz/mission interactions through the complete academy, check failing/passing quiz outcomes and retries, verify badges, certificate, persistence and reset, inspect the honest coach demonstration, and check major pages at desktop, tablet, and mobile sizes. Automated axe checks cover the major pages, coaching report, completed levels, quiz feedback, rewards, and certificate using WCAG A/AA rules. These checks supplement keyboard and responsive testing; they are not a complete manual accessibility audit.

Test output goes into ignored `test-results/` and `playwright-report/` directories.

## Project structure

- `src/data.ts` — curriculum, question banks, missions, badges, and demo reports.
- `src/progress.tsx` — persistence, progression rules, rewards, and shared state.
- `src/coach.ts` — explicit demo provider interface.
- `src/components/` — reusable UI, original SVG art, and interactive pitch.
- `src/pages/` — home, academy/lessons, quizzes, training, coach, progress, achievements, and parent area.
- `src/styles.css` — responsive design system, print certificate, and reduced motion.
- `src/progress.test.ts`, `tests/` — domain and browser tests.

Fonts are supplied by Fontsource packages under their included open font licenses. Icons are from Lucide (ISC). Soccer rules describe standard adult 11-a-side play with youth variations called out; local coaches and league rules take precedence for actual games. Physical practice should be supervised by a responsible adult in a safe environment.
