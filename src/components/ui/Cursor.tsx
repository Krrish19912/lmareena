import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/** Glowing custom cursor with a trailing ring. Disabled on touch / reduced-motion. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.2 });
  const rx = useSpring(x, { stiffness: 180, damping: 22 });
  const ry = useSpring(y, { stiffness: 180, damping: 22 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, [data-magnetic], [data-tilt]'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x: sx, y: sy }} />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.9 : 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  );
}
