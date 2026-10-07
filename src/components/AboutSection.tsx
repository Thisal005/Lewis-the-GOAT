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
    const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine)');
    const scene = section.querySelector<HTMLElement>('.about-scene');
    const timeline = section.querySelector<HTMLOListElement>('.about-timeline');
    const milestones = [...section.querySelectorAll<HTMLElement>('.about-timeline li')];
    let frame: number | null = null;
    let pointerFrame: number | null = null;
    let visible = false;
    const update = () => {
      frame = null;
      if (!scene || !timeline) return;
      const bounds = scene.getBoundingClientRect();
      const viewport = window.innerHeight;
      const mobile = window.innerWidth <= 700;
      const clamp = (value: number) => Math.max(0, Math.min(1, value));
      const progress = clamp((viewport - bounds.top) / (viewport + bounds.height));
      const depth = preference.matches ? 0 : (progress - .5) * 2;
      section.style.setProperty('--about-depth', `${depth * (mobile ? 12 : 42)}px`);
      section.style.setProperty('--about-title-y', `${-depth * (mobile ? 8 : 26)}px`);
      section.style.setProperty('--about-title-scale', String(1 - Math.max(0, depth) * (mobile ? .005 : .025)));
      section.style.setProperty('--about-portrait-scale', String(1 + Math.max(0, depth) * (mobile ? .01 : .035)));
      section.style.setProperty('--about-number-y', `${-depth * (mobile ? 16 : 65)}px`);
      section.style.setProperty('--about-haze-scale', String(1 + Math.abs(depth) * .12));
      const track = timeline.getBoundingClientRect();
      const trackProgress = preference.matches ? 1 : clamp((viewport * .8 - track.top) / (mobile ? track.height : viewport * .38));
      timeline.style.setProperty('--timeline-progress', String(trackProgress));
      milestones.forEach((milestone, index) => {
        const reached = preference.matches || (mobile
          ? trackProgress >= (milestone.offsetTop + 8) / track.height
          : trackProgress >= (index + .5) / milestones.length);
        milestone.dataset.reached = String(reached);
      });
    };
    const schedule = () => { if (visible && !document.hidden && frame === null) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { section.dataset.entered = 'true'; schedule(); }
    }, { threshold: 0 });
    observer.observe(section);
    // Animate each passage once, when it reaches the reader, rather than hiding it ahead of time.
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = 'true';
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: .12 });
    section.querySelectorAll('.about-headline, .about-deck, .about-summary, .about-values, .about-journey-link, .about-timeline li, .about-editorial article, .about-philosophy > h3, .about-quote').forEach(element => revealObserver.observe(element));
    const resetPointer = () => {
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
      pointerFrame = null;
      scene?.style.setProperty('--portrait-x', '0px');
      scene?.style.setProperty('--portrait-y', '0px');
      scene?.style.setProperty('--light-opacity', '0');
    };
    const movePointer = (event: PointerEvent) => {
      if (preference.matches || !pointerPreference.matches || event.pointerType !== 'mouse' || !scene) return;
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = null;
        const bounds = scene.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        scene.style.setProperty('--portrait-x', `${(x - .5) * 10}px`);
        scene.style.setProperty('--portrait-y', `${(y - .5) * 8}px`);
        scene.style.setProperty('--light-x', `${x * 100}%`);
        scene.style.setProperty('--light-y', `${y * 100}%`);
        scene.style.setProperty('--light-opacity', '1');
      });
    };
    const changeMotion = () => { resetPointer(); update(); };
    scene?.addEventListener('pointermove', movePointer);
    scene?.addEventListener('pointerleave', resetPointer);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', changeMotion);
    pointerPreference.addEventListener('change', resetPointer);
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      resetPointer();
      scene?.removeEventListener('pointermove', movePointer);
      scene?.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      preference.removeEventListener('change', changeMotion);
      pointerPreference.removeEventListener('change', resetPointer);
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
            <h2 id="about-heading" className="about-headline"><span><span>THE MAN</span></span><span><span>BEYOND</span></span><span><span>THE LIMIT.</span></span></h2>
            <p className="about-deck">From Stevenage to the world.</p>
            <p className="about-summary">A journey built on belief, discipline and the courage to push further. Discover the person behind the racing legacy.</p>
            <ul className="about-values" aria-label="Defining qualities"><li>Precision</li><li>Resilience</li><li>Purpose</li></ul>
            <a className="about-journey-link" href="#milestones">Explore his journey <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <ol className="about-timeline" aria-label="Lewis Hamilton's journey at a glance">
          {journey.map(({ year, title }) => (
            <li key={year}><span className="about-timeline-dot" aria-hidden="true" /><a href="#milestones" aria-label={`${year}: ${title}. Explore his journey.`}><span className="about-year">{year}</span><span className="about-moment">{title}</span></a></li>
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
