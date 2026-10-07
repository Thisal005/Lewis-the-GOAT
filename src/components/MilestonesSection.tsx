import { useEffect, useRef, useState } from 'react';
import { CAREER_MILESTONES } from '../data/portfolioData';
import './MilestonesSection.css';

type FilterType = 'All' | 'Championship' | 'Historic Win' | 'Career Move';
const filters: FilterType[] = ['All', 'Championship', 'Historic Win', 'Career Move'];
const archiveArt = {
  drive: { src: '/images/car1.png', width: 736, height: 920, alt: 'Mercedes Formula 1 car, front three-quarter view', label: 'THE DRIVE' },
  victory: { src: '/images/win.png', width: 736, height: 1102, alt: 'Lewis Hamilton celebrating with a trophy and the British flag', label: 'THE MOMENTS' },
  debut: { src: '/images/2007.png', width: 1340, height: 2400, alt: 'Lewis Hamilton with folded arms in his McLaren racing suit', label: 'THE FIRST CHAPTER' },
  firstTitle: { src: '/images/2008.png', width: 1340, height: 2400, alt: 'Lewis Hamilton holding a trophy in his McLaren racing suit', label: 'THE FIRST TITLE' },
  silverTitles: { src: '/images/2014.png', width: 1340, height: 2400, alt: 'Lewis Hamilton kissing a trophy in his silver Mercedes racing suit', label: 'THE SILVER CHAPTER' },
  dominance: { src: '/images/2017.png', width: 1340, height: 2400, alt: 'Lewis Hamilton smiling while embracing a trophy in his Mercedes racing suit', label: 'THE CHAMPIONSHIP YEARS' },
  records: { src: '/images/2020.png', width: 475, height: 770, alt: 'Lewis Hamilton facing forward in his black Mercedes racing suit', label: 'REDEFINING THE LIMIT' },
  future: { src: '/images/present.png', width: 1340, height: 2400, alt: 'Lewis Hamilton adjusting his yellow helmet in his Ferrari racing suit', label: 'THE NEXT CHAPTER' },
};
const chapterArt: Record<string, keyof typeof archiveArt> = {
  '2007': 'debut', '2008': 'firstTitle', '2013': 'drive', '2014 – 2015': 'silverTitles',
  '2017 – 2020': 'dominance', '2020 – 2021': 'records', '2024': 'victory', '2025 – Present': 'future',
};

export function MilestonesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const filteredMilestones = activeFilter === 'All' ? CAREER_MILESTONES : CAREER_MILESTONES.filter(m => m.category === activeFilter);
  const current = filteredMilestones[activeIndex] ?? filteredMilestones[0];
  const artId = chapterArt[current.year];
  const artwork = archiveArt[artId];

  useEffect(() => {
    const section = sectionRef.current;
    const scene = section?.querySelector<HTMLElement>('.journey-scene');
    const timeline = section?.querySelector<HTMLOListElement>('.journey-timeline');
    if (!section || !scene || !timeline) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    let visible = false;
    const update = () => {
      frame = null;
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      const depth = motion.matches ? 0 : (progress - .5) * 2;
      const mobile = innerWidth <= 700;
      section.style.setProperty('--journey-portrait-y', `${depth * (mobile ? 10 : 28)}px`);
      section.style.setProperty('--journey-title-y', `${-depth * (mobile ? 6 : 18)}px`);
      const track = timeline.getBoundingClientRect();
      section.style.setProperty('--journey-progress', String(motion.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .55 - track.top) / track.height))));
    };
    const schedule = () => { if (visible && !document.hidden && frame === null) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    observer.observe(section);
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = 'true';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .1 });
    section.querySelectorAll('.journey-headline, .journey-deck, .journey-description, .journey-moment').forEach(el => revealObserver.observe(el));
    const visibleMoments = new Set<HTMLElement>();
    const readingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) visibleMoments.add(element);
        else visibleMoments.delete(element);
      });
      const closest = [...visibleMoments].sort((a, b) => Math.abs(a.getBoundingClientRect().top - innerHeight * .3) - Math.abs(b.getBoundingClientRect().top - innerHeight * .3))[0];
      if (closest) setActiveIndex(Number(closest.dataset.index));
    }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
    section.querySelectorAll('.journey-moment').forEach(el => readingObserver.observe(el));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    timeline.addEventListener('toggle', schedule, true);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect(); revealObserver.disconnect(); readingObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      timeline.removeEventListener('toggle', schedule, true);
      motion.removeEventListener('change', update);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="milestones" className="milestones-section cinematic-journey" aria-labelledby="milestones-heading">
      <div id="journey" className="section-anchor-shim" aria-hidden="true" />
      <div className="journey-shell">
        <div className="journey-chapter"><span><i aria-hidden="true" />04 / THE JOURNEY</span><span className="journey-chapter-rule" aria-hidden="true" /><span className="journey-chapter-motto">EVERY MOMENT MADE THE MAN.</span></div>
        <div className="journey-scene">
          <span className="journey-backdrop-year" aria-hidden="true">07</span>
          <div className="journey-intro">
            <p className="journey-label">A STORY STILL BEING WRITTEN</p>
            <h2 id="milestones-heading" className="journey-headline"><span><span>EVERY TURN.</span></span><span><span>A NEW</span></span><span><span>CHAPTER.</span></span></h2>
            <p className="journey-deck">The road to something extraordinary.</p>
            <p className="journey-description">From the first lights out to the next starting line. Follow the defining decisions, unforgettable victories and moments that shaped the journey.</p>
            <a className="journey-link" href="#journey-timeline">Follow the journey <span aria-hidden="true">↓</span></a>
          </div>
          <div className="journey-hero-portrait"><img src="/images/lh2.png" width="736" height="1308" alt="Lewis Hamilton facing away from the camera in his Ferrari racing suit" loading="lazy" decoding="async" /></div>
        </div>
        <div className="journey-divider"><span>2007</span><span className="journey-divider-line" aria-hidden="true" /><span>2025 / A NEW CHAPTER</span></div>
        <div id="journey-timeline" className="journey-archive">
          <div className="journey-archive-heading"><div><p className="journey-label">THE DEFINING MOMENTS</p><h3>A career. A thousand turning points.</h3></div>
            <div className="journey-filters" role="group" aria-label="Filter career milestones">{filters.map(filter => <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => { setActiveFilter(filter); setActiveIndex(0); }}>{filter === 'All' ? 'All moments' : filter === 'Championship' ? 'Titles' : filter === 'Historic Win' ? 'Victories' : 'Team moves'}</button>)}</div>
          </div>
          <p className="journey-count" role="status" aria-live="polite" aria-atomic="true">{filteredMilestones.length} defining moments{activeFilter === 'All' ? ' · The complete journey' : ` · ${activeFilter}`}</p>
          <div className="journey-archive-grid">
            <aside className="journey-companion" aria-label="Journey artwork">
              <p className="journey-label">{artwork.label}</p><p className="journey-companion-year">{current.year}</p>
              <div key={artId} className="journey-archive-art" data-art={artId}>
                <div className="journey-archive-portrait">{Object.entries(archiveArt).map(([id, art]) => <img key={id} src={art.src} width={art.width} height={art.height} hidden={artId !== id} alt={artId === id ? art.alt : ''} decoding="async" />)}</div>
              </div>
              <p className="journey-companion-team">{artId === 'drive' ? 'MERCEDES / ON TRACK' : current.team}</p><p className="journey-companion-caption">Driven by belief. Defined by the moments.</p>
            </aside>
            <ol className="journey-timeline" aria-label="Career milestones in chronological order">
              {filteredMilestones.map((milestone, index) => (
                <li key={`${activeFilter}-${milestone.year}-${milestone.title}`} className={activeIndex === index ? 'journey-timeline-entry is-current' : 'journey-timeline-entry'}>
                  <span className="journey-timeline-dot" aria-hidden="true" />
                  <article id={`journey-moment-${CAREER_MILESTONES.indexOf(milestone)}`} className="journey-moment" data-index={index} aria-labelledby={`journey-title-${CAREER_MILESTONES.indexOf(milestone)}`}>
                    <div className="journey-moment-top"><p className="journey-moment-year">{milestone.year}</p><span className="journey-moment-category">{milestone.category}</span></div>
                    <p className="journey-moment-team">{milestone.team}</p>
                    <h4 id={`journey-title-${CAREER_MILESTONES.indexOf(milestone)}`}>{milestone.title}</h4>
                    <p className="journey-moment-summary">{milestone.summary}</p>
                    <div data-art={chapterArt[milestone.year]} className={`journey-inline-art ${milestone.year === '2013' ? 'journey-inline-car' : milestone.year === '2024' ? 'journey-inline-victory' : 'journey-inline-portrait'}`}><img src={archiveArt[chapterArt[milestone.year]].src} width={archiveArt[chapterArt[milestone.year]].width} height={archiveArt[chapterArt[milestone.year]].height} alt={archiveArt[chapterArt[milestone.year]].alt} loading="lazy" decoding="async" /></div>
                    <details className="journey-moment-details"><summary>Inside the moment <span aria-hidden="true">+</span></summary><p>{milestone.details}</p></details>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="journey-end"><p className="journey-label">THE STORY CONTINUES</p><p>Still driven. Still dreaming.</p><a className="journey-link" href="#gallery">Explore the gallery <span aria-hidden="true">→</span></a></div>
      </div>
    </section>
  );
}
