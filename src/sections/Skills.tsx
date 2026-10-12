import { motion } from 'motion/react';
import { skills } from '../data/portfolio';
import { Reveal } from '../components/ui/Reveal';

const ringLabel = ['Core', 'Platform', 'Tooling'];

export function Skills() {
  return (
    <section id="skills" className="section section--skills container">
      <Reveal>
        <p className="kicker mono">02 / Stack</p>
      </Reveal>
      <Reveal>
        <h2 className="h2">Orbiting the <em>core</em> stack.</h2>
      </Reveal>
      <p className="skills__hint mono">The rings on the left are the stack — inner orbit = daily drivers.</p>
      <div className="skills__grid">
        {[0, 1, 2].map((ring) => (
          <Reveal key={ring} delay={ring * 0.1}>
            <div className="glass skills__ring">
              <h3 className="mono skills__ring-title">
                <span className="ring-dot" data-ring={ring} /> {ringLabel[ring]}
              </h3>
              <ul>
                {skills
                  .filter((s) => s.ring === ring)
                  .map((s) => (
                    <li key={s.name} className="skill">
                      <div className="skill__head">
                        <span>{s.name}</span>
                        <span className="mono skill__pct">{s.level}%</span>
                      </div>
                      <div className="skill__track">
                        <motion.span
                          style={{ background: s.color }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: s.level / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
