import { useEffect, useMemo, useState } from 'react';
import { Scene } from './components/scene/Scene';
import { Cursor } from './components/ui/Cursor';
import { Loader } from './components/ui/Loader';
import { Nav } from './components/ui/Nav';
import { StaticBackdrop } from './components/ui/StaticBackdrop';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { initScrollStore } from './lib/scrollStore';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [mounted3D, setMounted3D] = useState(false);
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const webgl = useMemo(() => hasWebGL(), []);
  const lowEnd = useMemo(() => window.innerWidth < 700 || (navigator.hardwareConcurrency ?? 8) <= 4, []);

  useEffect(() => initScrollStore(), []);

  // Mount the (heavy) 3D scene after the first paint so the loader stays smooth.
  useEffect(() => {
    if (!webgl) return;
    const id = window.setTimeout(() => setMounted3D(true), 120);
    return () => window.clearTimeout(id);
  }, [webgl]);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className="bg-gradient" aria-hidden />
      {webgl && mounted3D ? (
        <div className="scene" aria-hidden>
          <Scene reducedMotion={reducedMotion} quality={lowEnd ? 'low' : 'high'} />
        </div>
      ) : (
        <StaticBackdrop />
      )}
      <div className="grain" aria-hidden />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
