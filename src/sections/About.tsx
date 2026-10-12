import { profile, stats } from '../data/portfolio';
import { Reveal } from '../components/ui/Reveal';
import { Counter } from '../components/ui/Counter';
import { TiltCard } from '../components/ui/TiltCard';

export function About() {
  return (
    <section id="about" className="section container">
      <Reveal>
        <p className="kicker mono">01 / About</p>
      </Reveal>
      <div className="about">
        <Reveal>
          <h2 className="h2">
            I turn complex systems into <em>tactile, fast</em> experiences — from the database to the last pixel.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lead">
            I'm {profile.name.split(' ')[0]}, a software engineer obsessed with performance, clean architecture and motion
            that means something. I've led WebGL platforms, realtime collaboration engines and design systems, and I care
            as much about how a product feels as how it scales.
          </p>
        </Reveal>
      </div>
      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <TiltCard className="stat glass" max={8}>
              <div className="stat__value">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="stat__label mono">{s.label}</div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
