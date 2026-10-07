import { SOURCES_AND_ATTRIBUTION, STATS_VERIFICATION_DATE } from '../data/portfolioData';
import { useCinemaReveal } from '../hooks/useCinemaReveal';
import './CinemaArchive.css';

export function SourcesSection() {
  const ref = useCinemaReveal();
  return <section ref={ref} id="sources" className="sources-section cinema-sources" aria-labelledby="sources-heading"><div className="archive-shell">
    <div className="archive-chapter"><span><i aria-hidden="true" />07 / THE REFERENCE ROOM</span><span className="archive-rule" aria-hidden="true" /><span className="archive-motto">CONTEXT BEHIND THE COLLECTION.</span></div>
    <div className="sources-heading" data-cinema-reveal><h2 id="sources-heading" className="archive-display">THE STORY.<br /><span>THE SOURCES.</span></h2><p className="archive-copy">Follow the references behind the racing records, career chapters and work beyond the track. An independent fan archive, with its historical context kept in view.</p></div>
    <div className="sources-layout"><aside className="sources-snapshot" data-cinema-reveal><p className="archive-micro">THE RECORD SNAPSHOT</p><strong>2024</strong><span>DECEMBER / END OF SEASON</span><p>Historical career totals. This collection is a snapshot, rather than a live results feed.</p><details><summary>Snapshot context</summary><p>{STATS_VERIFICATION_DATE}</p></details></aside>
      <ol className="reference-index">{SOURCES_AND_ATTRIBUTION.map((source, index) => <li key={source.title} data-cinema-reveal><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.title} (opens in a new tab)`}><span className="reference-number">0{index + 1}</span><span className="reference-body"><span className="archive-micro">{new URL(source.url).hostname.replace('www.', '')}</span><strong>{source.title}</strong><span className="reference-description">{source.description}</span></span><span className="reference-arrow" aria-hidden="true">↗</span></a></li>)}</ol>
    </div>
    <div className="sources-notes"><details><summary>About the imagery <span aria-hidden="true">+</span></summary><p>The gallery distinguishes supplied driver imagery from the artistic GOAT interpretation used in this fan portfolio. Image labels describe what is shown; team logos and third-party imagery belong to their respective owners.</p></details><details><summary>Reading the archive <span aria-hidden="true">+</span></summary><p>Career records retain their December 2024 snapshot date. Ferrari is presented as a subsequent career chapter. Source links lead to the organizations and archives listed in this collection; they are not live statistical updates.</p></details></div>
  </div></section>;
}
