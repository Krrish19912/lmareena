import { profile } from '../data/portfolio';
import { Reveal, SplitText } from '../components/ui/Reveal';
import { Magnetic } from '../components/ui/Magnetic';

export function Contact() {
  return (
    <section id="contact" className="section section--contact container">
      <Reveal>
        <p className="kicker mono">05 / Contact</p>
      </Reveal>
      <h2 className="contact__title" aria-label="Let's build something.">
        <SplitText text="Let's build" />
        <br />
        <span className="outline-text">
          <SplitText text="something." delay={0.4} />
        </span>
      </h2>
      <Reveal delay={0.2}>
        <p className="lead">Have a product, a prototype or a wild 3D idea? My inbox is open.</p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="contact__actions">
          <Magnetic>
            <a className="btn btn--primary btn--xl" href={`mailto:${profile.email}`}>
              <span>{profile.email}</span>
              <span className="btn__arrow" aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
        <ul className="socials">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="mono">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <footer className="footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React · Three.js · Motion</span>
      </footer>
    </section>
  );
}
