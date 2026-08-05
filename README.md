# Shell AI OS Controller Website

Premium storytelling website for Shell AI OS Controller, an open-source AI desktop control layer for Windows-first local workflows.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- GSAP
- Three.js

## Local Development

```bash
npm ci
npm run dev
```

## Production Build

```bash
npm run build
```

The build output is generated in `dist/`.

## GitHub Pages

This repo includes a GitHub Actions workflow that builds the site and deploys `dist/` to GitHub Pages from the `main` branch.

The Pages build uses:

```bash
GITHUB_PAGES=true npm run build
```

That sets the Vite base path to `/shell-ai-os-controller-website/` so public assets work correctly on the GitHub project page.
