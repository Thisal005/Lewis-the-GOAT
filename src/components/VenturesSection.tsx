import React from 'react';
import { VENTURES_AND_ADVOCACY } from '../data/portfolioData';

export const VenturesSection: React.FC = () => {
  return (
    <section id="ventures" className="ventures-section" aria-labelledby="ventures-heading">
      <div id="beyond-racing" className="section-anchor-shim" aria-hidden="true" />
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge cyan">Philanthropy &amp; Enterprise</span>
          <h2 id="ventures-heading" className="section-title">
            Purpose-Driven Impact Beyond the Cockpit
          </h2>
          <p className="section-subtitle mx-auto">
            Leveraging global sporting stature to fund education equity, dismantle systemic barriers
            in engineering, and build sustainable lifestyle enterprises.
          </p>
        </div>

        <div className="ventures-grid">
          {VENTURES_AND_ADVOCACY.map((venture) => (
            <article key={venture.name} className="glass-card venture-card">
              <div className="venture-card-header">
                <div>
                  <span className="section-badge red mb-1">{venture.category}</span>
                  <h3 className="venture-name">{venture.name}</h3>
                </div>
                <span className="venture-year font-mono">Est. {venture.founded}</span>
              </div>

              <div className="venture-role">
                <span className="role-label">Leadership:</span> {venture.role}
              </div>

              <p className="venture-desc">{venture.description}</p>

              <div className="venture-metrics-list">
                <h4 className="metrics-title">Key Initiatives &amp; Evidence:</h4>
                <ul>
                  {venture.impactMetrics.map((metric, idx) => (
                    <li key={idx} className="metric-bullet">
                      <span className="bullet-check" aria-hidden="true">&bull;</span>
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {venture.externalUrl && (
                <div className="venture-cta-wrapper">
                  <a
                    href={venture.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venture-link-btn"
                    aria-label={`${venture.urlLabel || `Learn more about ${venture.name}`} (opens in a new tab)`}
                  >
                    <span>{venture.urlLabel || 'Explore Official Website'}</span>
                    <span className="external-arrow" aria-hidden="true">&#8599;</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
