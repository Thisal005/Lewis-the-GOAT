import { useEffect, useRef } from 'react';
import { VERIFIED_QUOTES } from '../data/portfolioData';
import './AboutSection.css';

const journey = [
  { year: '1993', title: 'The first kart' },
  { year: '2007', title: 'Formula 1 debut' },
  { year: '2008', title: 'First world title' },
  { year: '2025', title: 'A new chapter' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    let visible = false;
    const update = () => {
      frame = null;
      const bounds = section.getBoundingClientRect();
      section.style.setProperty('--about-depth', `${preference.matches ? 0 : Math.max(-18, Math.min(18, -bounds.top * .035))}px`);
    };
    const schedule = () => { if (visible && frame === null) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { section.dataset.entered = 'true'; schedule(); }
    }, { threshold: 0 });
    observer.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    preference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      preference.removeEventListener('change', update);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section cinematic-about" aria-labelledby="about-heading">
      <div className="about-shell">
        <div className="about-chapter">
          <span><i aria-hidden="true" />02 / THE MAN BEHIND THE LEGEND</span>
          <span className="about-chapter-rule" aria-hidden="true" />
          <span className="about-chapter-motto">DRIVER. CREATOR. CHANGEMAKER.</span>
        </div>
        <div className="about-scene">
          <span className="about-number" aria-hidden="true">44</span>
          <div className="about-portrait">
            <img src="/images/about.png" alt="Lewis Hamilton in profile, looking upward in his Ferrari racing suit" width="736" height="1380" loading="lazy" decoding="async" />
          </div>
          <div className="about-intro">
            <h2 id="about-heading" className="about-headline"><span>THE MAN</span><span>BEYOND</span><span>THE LIMIT.</span></h2>
            <p className="about-deck">From Stevenage to the world.</p>
            <p className="about-summary">A journey built on belief, discipline and the courage to push further. Discover the person behind the racing legacy.</p>
            <ul className="about-values" aria-label="Defining qualities"><li>Precision</li><li>Resilience</li><li>Purpose</li></ul>
            <a className="about-journey-link" href="#milestones">Explore his journey <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <ol className="about-timeline" aria-label="Lewis Hamilton's journey at a glance">
          {journey.map(({ year, title }) => (
            <li key={year}><span className="about-timeline-dot" aria-hidden="true" /><span className="about-year">{year}</span><span className="about-moment">{title}</span></li>
          ))}
        </ol>
        <p className="about-scene-caption">A life beyond the racing line</p>
        <div className="about-editorial">
          <article className="about-biography">
            <p className="about-label">01 / THE BEGINNING</p><h3>Belief before the spotlight.</h3>
            <p>Born 7 January 1985 in Stevenage, Hertfordshire, Lewis began karting at age eight. His father Anthony worked multiple jobs to support that first dream. British Formula Renault, Formula 3 Euro Series and GP2 championships followed, opening the door to Formula 1.</p>
            <p>His driving style combines late, smooth trail-braking, extraordinary balance in changing weather and an instinctive ability to extend tyre life without compromising lap time.</p>
            <dl className="about-facts">
              <div><dt>First Grand Prix</dt><dd>Australia, 2007 · A debut podium</dd></div>
              <div><dt>First victory</dt><dd>Canada, 2007 · Montreal</dd></div>
              <div><dt>Career teams</dt><dd>McLaren / Mercedes / Ferrari</dd></div>
              <div><dt>Honours</dt><dd>Sir Lewis Hamilton · MBE</dd></div>
            </dl>
          </article>
          <article className="about-racecraft">
            <p className="about-label">02 / THE CRAFT</p><h3>Instinct. Refined by discipline.</h3>
            <ol className="about-disciplines">
              <li><span aria-hidden="true">01</span><div><h4>Mastery in the rain</h4><p>Silverstone 2008. Istanbul 2020. Defining drives that reveal his feel for grip when the conditions demand more.</p></div></li>
              <li><span aria-hidden="true">02</span><div><h4>One lap. Total commitment.</h4><p>Singapore 2018 captures the precision, confidence and commitment behind his qualifying craft.</p></div></li>
              <li><span aria-hidden="true">03</span><div><h4>The art of going further</h4><p>Tyre management becomes race strategy: extending stints and creating opportunities, as seen in Hungary and Monaco in 2019.</p></div></li>
            </ol>
          </article>
        </div>
        <div className="about-philosophy" aria-labelledby="about-philosophy-heading">
          <p className="about-label">03 / IN HIS WORDS</p><h3 id="about-philosophy-heading">The mindset behind the legacy.</h3>
          <div className="about-quotes">
            {VERIFIED_QUOTES.map((item, index) => (
              <blockquote key={item.quote} className={index === 0 ? 'about-quote about-quote-mantra' : 'about-quote'}>
                <p>“{item.quote}”</p><footer><cite>{item.context}</cite><span>{item.source} · {item.year}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
