import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '../data/portfolio';
import { SplitText } from '../components/ui/Reveal';
import { Magnetic } from '../components/ui/Magnetic';

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const [first, last] = profile.name.split(' ');
  return (
    <section id="top" className="hero container">
      <motion.p
        className="eyebrow mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <span className="pulse-dot" /> {profile.availability}
      </motion.p>

      <h1 className="hero__title" aria-label={profile.name}>
        <span className="hero__line">
          <SplitText text={first} delay={2.5} />
        </span>
        <span className="hero__line hero__line--outline">
          <SplitText text={last} delay={2.75} />
        </span>
      </h1>

      <motion.div
        className="hero__role"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <span className="mono prompt">&gt;</span> <RoleCycler />
      </motion.div>

      <motion.p
        className="hero__tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        className="hero__ctas"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Magnetic>
          <a className="btn btn--primary" href="#projects">
            <span>View work</span>
            <span className="btn__arrow" aria-hidden>→</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn btn--ghost" href={profile.resumeUrl}>
            Resume
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        className="hero__meta mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.9, duration: 1 }}
      >
        <span>{profile.location}</span>
        <span className="hero__scroll">Scroll ↓</span>
      </motion.div>
    </section>
  );
}
