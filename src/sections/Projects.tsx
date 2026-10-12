import { projects } from '../data/portfolio';
import { Reveal } from '../components/ui/Reveal';
import { TiltCard } from '../components/ui/TiltCard';

export function Projects() {
  return (
    <section id="projects" className="section container">
      <Reveal>
        <p className="kicker mono">03 / Selected work</p>
      </Reveal>
      <Reveal>
        <h2 className="h2">Things I've <em>built</em>.</h2>
      </Reveal>
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.12} className="project-wrap">
            <TiltCard className="project glass" max={10}>
              <div className="project__top">
                <span className="mono project__year">{p.year}</span>
                <span className="mono project__metric" style={{ color: p.accent, borderColor: p.accent }}>
                  {p.metric}
                </span>
              </div>
              <div className="project__orb" style={{ background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 62%)` }} />
              <h3 className="project__title">{p.title}</h3>
              <p className="project__summary">{p.summary}</p>
              <div className="project__tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag mono">
                    {t}
                  </span>
                ))}
              </div>
              <a className="project__link mono" href={p.href} style={{ color: p.accent }}>
                Case study ↗
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
