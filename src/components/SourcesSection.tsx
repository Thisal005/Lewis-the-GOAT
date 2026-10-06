import React from 'react';
import { SOURCES_AND_ATTRIBUTION, STATS_VERIFICATION_DATE } from '../data/portfolioData';

export const SourcesSection: React.FC = () => {
  return (
    <section id="sources" className="sources-section" aria-labelledby="sources-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-badge rose">Factual Transparency</span>
          <h2 id="sources-heading" className="section-title">
            Data Sources, Verification &amp; Attribution
          </h2>
          <p className="section-subtitle">
            To uphold rigorous journalistic and engineering integrity, all statistical tallies,
            quotes, and timeline entries are linked to official, public records.
          </p>
        </div>

        <div className="sources-grid">
          {/* Factual Sources List */}
          <div className="glass-card sources-list-card">
            <h3 className="sources-box-title">Verified Authoritative Sources</h3>
            <p className="sources-box-desc">
              All quantitative metrics are verified as of <strong>{STATS_VERIFICATION_DATE}</strong>.
            </p>

            <ul className="sources-items-list">
              {SOURCES_AND_ATTRIBUTION.map((source) => (
                <li key={source.title} className="source-list-item">
                  <div className="source-info">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-title-link"
                      aria-label={`${source.title} (opens in a new tab)`}
                    >
                      <span>{source.title}</span>
                      <span className="external-arrow" aria-hidden="true">&#8599;</span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <p className="source-item-desc">{source.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Attribution & Unverified Clarifications */}
          <div className="glass-card attribution-card">
            <h3 className="sources-box-title">Media Attribution &amp; Unverified Items</h3>
            
            <div className="attribution-content">
              <div className="attribution-block">
                <h4 className="attribution-subtitle">Visual Content Copyright</h4>
                <p>
                  Imagery featured across this fan archival project represents editorial photography 
                  credited to Formula 1 Media, Mercedes-AMG Petronas Motorsport, Scuderia Ferrari HP, 
                  and associated sporting press photographers. Imagery is utilized strictly under 
                  non-commercial, transformative educational fair-use principles.
                </p>
              </div>

              <div className="attribution-block">
                <h4 className="attribution-subtitle">Audit of Quotations &amp; Claims</h4>
                <p>
                  All quotes featured in this portfolio were corroborated against published FIA post-race 
                  press conferences or broadcast audio. Fabricated internet memes or unsourced quotes 
                  have been deliberately omitted.
                </p>
              </div>

              <div className="attribution-block verification-status">
                <span className="status-indicator" aria-hidden="true">&#9679;</span>
                <p>
                  <strong>Unverified Future Projections:</strong> Any speculative performance forecasts 
                  regarding upcoming Scuderia Ferrari race results remain unverified until official FIA 
                  Grand Prix timing sessions conclude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
