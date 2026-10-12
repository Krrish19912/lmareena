import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Magnetic } from './Magnetic';
import { profile } from '../../data/portfolio';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <motion.div className="nav__progress" style={{ scaleX: bar }} aria-hidden />
      <div className="nav__inner">
        <a href="#top" className="nav__logo" aria-label="Back to top">
          <span className="nav__logo-mark" />
          <span className="mono">{profile.handle}</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Magnetic>
          <a className="btn btn--ghost btn--sm" href={`mailto:${profile.email}`}>
            Say hello
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
