import { VENTURES_AND_ADVOCACY } from '../data/portfolioData';
import { useCinemaReveal } from '../hooks/useCinemaReveal';
import './CinemaArchive.css';

export function VenturesSection() {
  const ref = useCinemaReveal();
  const mission = VENTURES_AND_ADVOCACY[0];
  return <section ref={ref} id="ventures" className="ventures-section cinema-impact" aria-labelledby="ventures-heading">
    <div id="beyond-racing" className="section-anchor-shim" aria-hidden="true" />
    <div className="archive-shell">
      <div className="archive-chapter"><span><i aria-hidden="true" />06 / BEYOND THE PODIUM</span><span className="archive-rule" aria-hidden="true" /><span className="archive-motto">PHILANTHROPY & ENTERPRISE</span></div>
      <div className="impact-heading" data-cinema-reveal><h2 id="ventures-heading" className="archive-display">GREATNESS<br />HAS A<br /><span>PURPOSE.</span></h2><div><p className="archive-deck">Creating space for the next generation.</p><p className="archive-copy">The drive to make a difference reaches beyond the circuit. Education, inclusion, creative storytelling and new enterprises form another part of the Hamilton story.</p><a className="archive-text-link" href="#impact-mission">Discover the impact <span aria-hidden="true">↓</span></a></div></div>
      <article id="impact-mission" className="impact-mission" data-cinema-reveal>
        <div className="impact-monogram" aria-hidden="true"><span>MISSION</span><strong>44</strong><span>CHANGE STARTS WITH OPPORTUNITY.</span></div>
        <div className="impact-mission-story"><p className="archive-micro">01 / {mission.category} · EST. {mission.founded}</p><h3>{mission.name}</h3><p className="impact-role">{mission.role}</p><p>{mission.description}</p><ul>{mission.impactMetrics.map(metric => <li key={metric}>{metric}</li>)}</ul><a className="archive-text-link" href={mission.externalUrl} target="_blank" rel="noopener noreferrer">Explore Mission 44 <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
      </article>
      <div className="impact-enterprises"><p className="archive-micro">MORE WAYS TO MOVE THE WORLD</p>{VENTURES_AND_ADVOCACY.slice(1).map((venture, index) => <details key={venture.name} className="impact-venture" data-cinema-reveal><summary><span className="impact-venture-index">0{index + 2}</span><span><span className="archive-micro">{venture.category}</span><strong>{venture.name}</strong></span><span className="impact-venture-year">EST. {venture.founded}</span><span className="impact-venture-toggle" aria-hidden="true">+</span></summary><div className="impact-venture-content"><div><p className="impact-role">{venture.role}</p><p>{venture.description}</p>{venture.externalUrl && <a className="archive-text-link" href={venture.externalUrl} target="_blank" rel="noopener noreferrer">{venture.urlLabel} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}</div><ul>{venture.impactMetrics.map(metric => <li key={metric}>{metric}</li>)}</ul></div></details>)}</div>
      <p className="impact-closing" data-cinema-reveal>More than a legacy.<br /><em>A door held open.</em></p>
    </div>
  </section>;
}
