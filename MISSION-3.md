# MISSION 3 — Shell AI Website: Technical Hardening (Codex CLI)

You are working in an existing **React 19 + Vite (rolldown) + TypeScript + Tailwind + GSAP ScrollTrigger + three.js** marketing site for "Shell AI OS Controller".

## Project root
`C:\Users\Administrator\Desktop\shell-ai-os-controller-website-main\shell-ai-os-controller-website-main`

## Ground rules (STRICT)
1. **Do NOT git commit or git push.** Just edit files. A human reviews and commits.
2. **Do NOT touch the creative frontend work** — these are finished and off-limits for modification:
   - `src/components/ShellCoreScene.tsx` (3D hero)
   - The scroll-flight GSAP code in `src/components/LaptopMockup.tsx` (LaptopStory section)
   - Hero/story/platform/final-cta JSX in `src/pages/HomePage.tsx`
   - The appended CSS block at the END of `src/styles.css` marked `2026 SCROLL-FLIGHT UPGRADES`
   You may ADD new CSS rules after it, but never edit/override those rules destructively.
3. TypeScript strict — `npm run build` (which runs `tsc -b`) MUST pass. Verify before finishing.
4. Keep all user-facing copy unchanged. This is a technical pass, not a redesign.
5. The app uses Lenis smooth scroll (window.lenis), GSAP ScrollTrigger, react-router v7.

## Current state
- Homepage hero + scroll journey are done. Build passes. One known issue: `npm run build` warns "Some chunks are larger than 500 kB" because three.js + everything is in one eager bundle.

## Tasks (in priority order)

### Task 1 — Route-level code splitting
- In `src/App.tsx` (or wherever routes are declared), convert ALL page imports to `React.lazy()` + `<Suspense>`.
- Keep `SiteNav`, `SiteFooter`, `SiteMotion` eager (they're the shell).
- Suspense fallback: a minimal on-brand loader (dark bg #05070b, small teal pulsing "SHELL" wordmark, `aria-busy`, respects prefers-reduced-motion). Put its CSS at the end of styles.css.
- Goal: `npm run build` chunk warning gone or clearly reduced (three.js should end up in a homepage-only chunk).

### Task 2 — 404 route
- Add a catch-all `*` route rendering an on-brand NotFound page (big "404", one-line copy, link back to `/`). Match existing design tokens (dark bg, teal accent, Manrope/Inter).

### Task 3 — Image loading audit
- Add `loading="lazy"` + `decoding="async"` to all `<img>` that render below the fold (story step mockups, review avatars, footer logos if any).
- Do NOT lazy-load the hero visuals or the first story-step image.
- If any large PNG/JPG in `public/` is trivially convertible to smaller size without quality loss (e.g. via sharp/imagemin already available), note it in the report — do NOT install new heavy deps without need.

### Task 4 — Accessibility pass
- Add `aria-current="page"` handling on `SiteNav` links for the active route (NavLink or useLocation).
- Ensure all interactive elements have visible `:focus-visible` styles (add a global rule if missing: 2px solid var(--site-cyan), offset 2px).
- Add a "Skip to main content" link (first focusable element, visually hidden until focused, targets the `<main>`/main landmark — add id if needed).
- Verify form inputs on the reviews form have associated labels (they use aria-label/placeholder — make sure at least one accessible name exists; fix if missing).
- Check heading order on secondary pages (no h1→h3 skips).

### Task 5 — Mobile/responsive audit (360px–768px)
- Using CSS only, audit media queries for: hero stack, story steps single-column, platform grid single-column, reviews form, docs page tables/code blocks (horizontal scroll if needed), nav collapse.
- The `.home-section-rail` and `.story-progress-rail` must stay hidden below 1440px (already handled — verify).
- Fix any horizontal overflow at 360px width.

### Task 6 — SEO/social meta
- In `index.html`: ensure `<title>`, meta description, `theme-color` (#05070b), Open Graph + Twitter card tags exist (title/description/type/url/image — point image at an existing asset in public/, or note if none suitable).
- Add `<meta name="color-scheme" content="dark">`.

### Task 7 — Runtime sanity
- After changes: `npm run build` must pass clean. Then run `npm run preview -- --port 4173` briefly and curl `/` expecting 200 (kill the server after).
- Check existing `vite.config.ts` — do not break the existing setup.

## Deliverable
Write `MISSION-3-REPORT.md` in the project root: per-task what you changed (file:list), build result, chunk sizes before/after (run `npm run build` first thing to capture "before"), anything you deliberately skipped and why.

## Definition of done
- [ ] All 7 tasks attempted
- [ ] `npm run build` passes
- [ ] No creative files modified (git diff must show zero changes in the off-limits list above)
- [ ] MISSION-3-REPORT.md written
