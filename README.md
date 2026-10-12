# lmareena — 3D Tech Portfolio

An animated, 3D portfolio built with **React 19 + Vite + TypeScript**, **Three.js via React Three Fiber**
(`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) and **Motion** for UI animation.

See [PLAN.md](./PLAN.md) for the research summary, design direction and architecture.

## Features
- Morphing, noise-displaced wireframe core (GLSL, simplex noise) with fresnel glow
- GPU-animated starfield that streams faster with scroll and parallaxes to the pointer
- Scrolling synthwave grid floor, bloom / chromatic aberration / film grain / vignette
- Orbiting 3D skill rings during the Skills section
- Animated loader, custom cursor, magnetic buttons, 3D tilt cards, split-text reveals, animated timeline
- Graceful fallbacks: static backdrop without WebGL, reduced 3D quality on low-end devices,
  `prefers-reduced-motion` support

## Edit your content
All text, projects, skills and experience live in **`src/data/portfolio.ts`**.

## Scripts
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build on :4173
```

## Structure
```
src/
  data/portfolio.ts          content
  lib/scrollStore.ts         shared scroll/pointer state read in the render loop
  components/scene/          R3F scene (core, starfield, grid, skill rings, post-processing)
  components/ui/             loader, cursor, nav, reveal, magnetic, tilt card, counter
  sections/                  Hero, About, Skills, Projects, Experience, Contact
```
