import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';

/** Counts up from 0 once scrolled into view. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="counter">
      {val}
      {suffix}
    </span>
  );
}
