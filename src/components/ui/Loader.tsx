import { useEffect, useState } from 'react';
import { AnimatePresence, motion, animate } from 'motion/react';

/** Full-screen intro with a counting percentage. Unmounts itself when done. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => {
        setTimeout(() => setShow(false), 250);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="loader__panel loader__panel--top"
            exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
          />
          <motion.div
            className="loader__panel loader__panel--bottom"
            exit={{ y: '100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
          />
          <div className="loader__content">
            <span className="loader__label mono">INITIALIZING SYSTEMS</span>
            <span className="loader__pct">{String(pct).padStart(3, '0')}</span>
            <div className="loader__bar">
              <motion.span style={{ scaleX: pct / 100 }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
