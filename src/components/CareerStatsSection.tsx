import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { DETAILED_CAREER_STATS, ERA_BREAKDOWN, QUICK_STATS, STATS_VERIFICATION_DATE } from '../data/portfolioData';
import './CareerStatsSection.css';

const eraIds = ['mclaren', 'mercedes', 'ferrari'];
const eraLabels: Record<string, string> = { mclaren: 'McLaren', mercedes: 'Mercedes', ferrari: 'Ferrari' };
const recordLabels = ['World titles', 'Grand Prix wins', 'Pole positions', 'Podium finishes'];

export function CareerStatsSection() {
  const [selectedEra, setSelectedEra] = useState('mercedes');
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeEra = ERA_BREAKDOWN.find(era => era.id === selectedEra) ?? ERA_BREAKDOWN[0];

  useEffect(() => {
    const section = sectionRef.current;
    const scene = section?.querySelector<HTMLElement>('.legacy-scene');
    if (!section || !scene) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    let visible = false;
    const update = () => {
      frame = null;
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
      const depth = motion.matches ? 0 : (progress - .5) * 2;
      const mobile = window.innerWidth <= 700;
      section.style.setProperty('--legacy-portrait-y', `${depth * (mobile ? 10 : 30)}px`);
      section.style.setProperty('--legacy-title-y', `${-depth * (mobile ? 6 : 20)}px`);
      section.style.setProperty('--legacy-number-y', `${-depth * (mobile ? 12 : 50)}px`);
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
    }, { threshold: .15 });
    section.querySelectorAll('.legacy-headline, .legacy-deck, .legacy-description, .legacy-record, .legacy-eras, .legacy-detail').forEach(el => revealObserver.observe(el));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      motion.removeEventListener('change', update);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % eraIds.length;
    else if (event.key === 'ArrowLeft') next = (index + eraIds.length - 1) % eraIds.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = eraIds.length - 1;
    else return;
    event.preventDefault();
    setSelectedEra(eraIds[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="career-stats" className="stats-section cinematic-legacy" aria-labelledby="stats-heading">
      <div id="legacy" className="section-anchor-shim" aria-hidden="true" />
      <div className="legacy-shell">
        <div className="legacy-chapter"><span><i aria-hidden="true" />03 / THE LEGACY</span><span className="legacy-chapter-rule" aria-hidden="true" /><span className="legacy-chapter-motto">EXCELLENCE, ERA AFTER ERA.</span></div>
        <div className="legacy-scene">
          <span className="legacy-number" aria-hidden="true">7</span>
          <div className="legacy-portrait"><img src="/images/legacy.png" alt="Lewis Hamilton looking upward toward the camera in his Mercedes racing suit, holding his helmet" width="736" height="1308" loading="lazy" decoding="async" /></div>
          <div className="legacy-intro">
            <p className="legacy-label">THE RECORD. THE STANDARD.</p>
            <h2 id="stats-heading" className="legacy-headline"><span><span>BUILT TO</span></span><span><span>REDEFINE</span></span><span><span>GREATNESS.</span></span></h2>
            <p className="legacy-deck">A legacy measured in moments.</p>
            <p className="legacy-description">Every title. Every pole. Every defining drive.<br />Explore the numbers behind an extraordinary career.</p>
            <a className="legacy-records-link" href="#legacy-records">Explore the records <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <dl className="legacy-records" aria-label="Career totals through December 2024">
          {QUICK_STATS.map((record, index) => (
            <div className="legacy-record" key={record.label}><dt>{recordLabels[index]}</dt><dd>{record.value}</dd></div>
          ))}
        </dl>
        <p className="legacy-snapshot">Career records as of December 2024</p>
        <div className="legacy-eras">
          <div className="legacy-era-header">
            <p className="legacy-label">THE CHAPTERS OF GREATNESS</p>
            <div className="legacy-tabs" role="tablist" aria-label="Explore career team eras">
              {eraIds.map((id, index) => (
                <button key={id} ref={el => { tabRefs.current[index] = el; }} type="button" role="tab" id={`legacy-tab-${id}`} aria-controls="legacy-era-panel" aria-selected={selectedEra === id} tabIndex={selectedEra === id ? 0 : -1} onClick={() => setSelectedEra(id)} onKeyDown={event => navigateTabs(event, index)}>{eraLabels[id]}</button>
              ))}
            </div>
          </div>
          <div key={selectedEra} id="legacy-era-panel" className="legacy-era-panel" role="tabpanel" aria-labelledby={`legacy-tab-${selectedEra}`} tabIndex={0}>
            <div className="legacy-era-title"><h3>{selectedEra === 'mercedes' ? 'Mercedes-AMG' : eraLabels[selectedEra]}</h3><p>{selectedEra === 'ferrari' ? 'A new chapter · 2025' : activeEra.years}</p></div>
            {selectedEra === 'ferrari' ? (
              <p className="legacy-ferrari-note">The next chapter begins in Maranello. This December 2024 record snapshot predates his Ferrari debut.</p>
            ) : (
              <dl className="legacy-era-metrics">
                {[[activeEra.championships, 'Titles'], [activeEra.wins, 'Wins'], [activeEra.poles, 'Poles'], [activeEra.podiums, 'Podiums']].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
            )}
            <p className="legacy-era-description">{activeEra.description}</p>
            {selectedEra !== 'ferrari' && <p className="legacy-era-starts">{activeEra.races} Grands Prix started during this era.</p>}
          </div>
        </div>
        <div id="legacy-records" className="legacy-details" aria-labelledby="legacy-records-heading">
          <div className="legacy-details-heading"><p className="legacy-label">BEYOND THE HEADLINES</p><h3 id="legacy-records-heading">The detail behind the dominance.</h3></div>
          <dl className="legacy-detail-grid">
            {DETAILED_CAREER_STATS.map(metric => <div key={metric.label} className="legacy-detail"><dt>{metric.label}</dt><dd>{metric.value}</dd><dd className="legacy-detail-caption">{metric.detail}</dd></div>)}
          </dl>
          <p className="legacy-source-note">Archive snapshot: {STATS_VERIFICATION_DATE}. Sources: FIA annual classifications and Formula 1 driver archives. <a href="#sources">View sources <span aria-hidden="true">↗</span></a></p>
        </div>
      </div>
    </section>
  );
}
