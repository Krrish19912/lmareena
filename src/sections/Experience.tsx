import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { experience } from '../data/portfolio';
import { Reveal } from '../components/ui/Reveal';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section container">
      <Reveal>
        <p className="kicker mono">04 / Path</p>
      </Reveal>
      <Reveal>
        <h2 className="h2">Experience, <em>in sequence</em>.</h2>
      </Reveal>
      <div className="timeline" ref={ref}>
        <div className="timeline__rail" aria-hidden>
          <motion.span style={{ height }} />
        </div>
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.08} className="timeline__item" as="div">
            <span className="timeline__node" aria-hidden />
            <div className="glass timeline__card">
              <p className="mono timeline__period">{e.period}</p>
              <h3 className="timeline__role">
                {e.role} <span className="timeline__company">@ {e.company}</span>
              </h3>
              <ul>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
