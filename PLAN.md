# 3D Tech Portfolio — Plan

## 1. Research summary
- **Stack**: React 19 + Vite + TypeScript. 3D via `three` + `@react-three/fiber` (R3F 9.x, declarative
  Three.js in JSX) + `@react-three/drei` (helpers) + `@react-three/postprocessing` (bloom, noise, aberration).
  UI motion via `motion` (Framer Motion). Sources: strapi.io guide (Vite + R3F + drei stack),
  DEV "Interactive 3D Portfolio with R3F" (Next 16 + R3F + GSAP ScrollTrigger + Framer Motion),
  npm `@react-three/fiber` 9.8.1 (latest).
- **Performance lessons** (from the same guides): lazy-load the Canvas, use `Points`/`BufferGeometry`
  instead of thousands of meshes, one shared clock in `useFrame`, memoize heavy components,
  cap DPR, provide a non-WebGL fallback, keep models light (no big GLB needed — everything is procedural).
- **Scroll-driven 3D**: pass scroll progress into the scene (shared store read in `useFrame`) so the camera
  flies between "waypoints" as the user scrolls.

## 2. Design direction
- Dark "mission control" theme: near-black base, cyan + violet + lime neon accents, glassmorphism panels.
- "Next-level" motion: morphing wireframe core, particle starfield that reacts to the pointer,
  scroll-driven camera path, orbiting tech-stack ring, 3D tilt project cards, magnetic buttons,
  split-text reveals, custom glowing cursor, animated loader, scanline/noise overlay.
- Accessible: `prefers-reduced-motion` disables heavy motion, keyboard focus styles, semantic sections.

## 3. Information architecture (single page, anchored sections)
1. **Hero** — name, role, animated typing/split reveal, 3D morphing core + starfield, CTA buttons.
2. **About** — bio + animated stat counters.
3. **Skills** — 3D orbit ring of technologies (sprites on rings), plus proficiency bars.
4. **Projects** — 3D tilt cards with glare, tags, links.
5. **Experience** — animated timeline.
6. **Contact** — magnetic CTA + links.

All content lives in one file (`src/data/portfolio.ts`) so the owner can edit without touching components.

## 4. Architecture
```
src/
  data/portfolio.ts        content (edit me)
  lib/scrollStore.ts       shared scroll/pointer state (no React re-renders in the render loop)
  components/scene/        R3F scene pieces (Core, Starfield, SkillRing, CameraRig, Scene)
  components/ui/           Nav, Cursor, Loader, Reveal, Magnetic, TiltCard, Counter
  sections/                Hero, About, Skills, Projects, Experience, Contact
  App.tsx / main.tsx / styles.css
```

## 5. Milestones
1. Scaffold Vite + TS, install deps, base styles. ✅
2. Global 3D background (Canvas, lights, postprocessing, scroll camera rig).
3. Hero with morphing core + reactive starfield.
4. Content sections with motion + 3D skill ring + tilt cards.
5. Polish: loader, cursor, reduced-motion & no-WebGL fallbacks, responsive layout.
6. Verify: `npm run build`, run dev server, check for console errors.

## 6. Out of scope (for now)
- CMS / backend contact form (contact uses mailto + links).
- Real GLB models (procedural geometry keeps the bundle small; swap in `useGLTF` later if desired).
